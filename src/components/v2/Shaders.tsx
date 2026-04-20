import { useEffect, useRef } from 'react';

export type ShaderIntensity = 'low' | 'medium' | 'high';

interface ShaderProps {
  intensity?: ShaderIntensity;
  className?: string;
}

const VS = `
  attribute vec2 aPos;
  varying vec2 vUv;
  void main(){
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('shader compile', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

function setupQuad(gl: WebGLRenderingContext, prog: WebGLProgram) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
}

export function ShaderHero({ intensity = 'medium' }: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.style.background =
        'radial-gradient(ellipse at 30% 40%, #142840 0%, #0A1628 60%, #07090E 100%)';
      return;
    }

    const fs = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uRes;
      uniform vec2 uMouse;
      uniform float uIntensity;

      vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
      float snoise(vec2 v){
        const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i=floor(v+dot(v,C.yy));
        vec2 x0=v-i+dot(i,C.xx);
        vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
        vec4 x12=x0.xyxy+C.xxzz;
        x12.xy-=i1;
        i=mod289(i);
        vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
        vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
        m=m*m;m=m*m;
        vec3 x=2.0*fract(p*C.www)-1.0;
        vec3 h=abs(x)-0.5;
        vec3 ox=floor(x+0.5);
        vec3 a0=x-ox;
        m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
        vec3 g;
        g.x=a0.x*x0.x+h.x*x0.y;
        g.yz=a0.yz*x12.xz+h.yz*x12.yw;
        return 130.0*dot(m,g);
      }

      float fbm(vec2 p){
        float v=0.0;
        float a=0.5;
        for(int i=0;i<5;i++){
          v+=a*snoise(p);
          p*=2.1;
          a*=0.5;
        }
        return v;
      }

      void main(){
        vec2 uv=vUv;
        float aspect=uRes.x/uRes.y;
        vec2 p=uv;
        p.x*=aspect;

        float t=uTime*0.04*uIntensity;

        vec2 q=vec2(fbm(p+vec2(t*0.3,0.0)), fbm(p+vec2(1.7,9.2)+t*0.2));
        vec2 r=vec2(fbm(p+q*1.5+vec2(t*0.4,3.1)), fbm(p+q*1.5+vec2(8.3,2.8)+t*0.3));
        float n=fbm(p+r*1.2);

        vec2 mp = uMouse;
        mp.x *= aspect;
        float dm = length(p - mp);
        float mouseGlow = exp(-dm*3.5)*0.32*uIntensity;

        vec3 cDark   = vec3(0.027, 0.035, 0.055);
        vec3 cDeep   = vec3(0.039, 0.086, 0.157);
        vec3 cDeep2  = vec3(0.078, 0.157, 0.251);
        vec3 cBlue   = vec3(0.153, 0.247, 0.400);
        vec3 cGold   = vec3(0.831, 0.635, 0.298);
        vec3 cGoldHi = vec3(0.902, 0.710, 0.376);

        float vMix = smoothstep(-0.3, 1.2, n + uv.y*0.6);
        vec3 col = mix(cDark, cDeep, smoothstep(0.0,0.3,vMix));
        col = mix(col, cDeep2, smoothstep(0.25,0.55,vMix));
        col = mix(col, cBlue*0.5, smoothstep(0.55,0.75,vMix));

        float goldMask = smoothstep(0.55, 0.95, n*1.2 + r.y*0.3 - uv.y*0.35);
        goldMask *= smoothstep(0.0, 0.5, 1.0 - uv.y);
        col = mix(col, cGold, goldMask*0.35);

        vec2 hp = vec2(0.22 + sin(uTime*0.15)*0.06, 0.72 + cos(uTime*0.12)*0.05);
        hp.x *= aspect;
        float spot = exp(-length(p-hp)*2.8);
        col += cGoldHi * spot * 0.12 * uIntensity;

        col += cGoldHi * mouseGlow;
        col += cGold * exp(-dm*1.6) * 0.09 * uIntensity;

        float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        col += (grain - 0.5) * 0.015;

        float vig = smoothstep(1.3, 0.4, length(uv-0.5));
        col *= mix(0.6, 1.0, vig);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const prog = gl.createProgram();
    if (!prog) return;
    const vsh = compileShader(gl, gl.VERTEX_SHADER, VS);
    const fsh = compileShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vsh || !fsh) return;
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    setupQuad(gl, prog);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uIntensity = gl.getUniformLocation(prog, 'uIntensity');

    const intensityMap: Record<ShaderIntensity, number> = { low: 0.4, medium: 0.9, high: 1.6 };
    const intAmount = intensityMap[intensity] ?? 0.9;

    let mouse = [0.5, 0.5];
    const onMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = [
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      ];
    };
    window.addEventListener('mousemove', onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform1f(uIntensity, intAmount);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export function ShaderField({ intensity = 'medium', className = '' }: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.style.background =
        'radial-gradient(ellipse at 50% 50%, #0F1E35 0%, #07090E 100%)';
      return;
    }

    const fs = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uRes;
      uniform vec2 uMouse;
      uniform float uIntensity;

      float hash21(vec2 p){
        p = fract(p * vec2(234.83, 451.13));
        p += dot(p, p + 43.21);
        return fract(p.x * p.y);
      }

      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        float a = hash21(i);
        float b = hash21(i+vec2(1.0,0.0));
        float c = hash21(i+vec2(0.0,1.0));
        float d = hash21(i+vec2(1.0,1.0));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }

      float flow(vec2 p, float t){
        return noise(p*1.2 + t*0.08) * 6.2831;
      }

      void main(){
        vec2 uv = vUv;
        float aspect = uRes.x / uRes.y;
        vec2 p = uv;
        p.x *= aspect;

        float gridSize = 32.0;
        vec2 gp = p * gridSize;

        vec2 cell = floor(gp);
        vec2 local = fract(gp) - 0.5;

        float ang = flow(cell/gridSize, uTime);
        vec2 disp = vec2(cos(ang), sin(ang)) * 0.35;
        local -= disp;

        float d = length(local);

        float pulse = 0.5 + 0.5 * sin(uTime*0.4 + cell.x*0.3 + cell.y*0.5);
        float dotSize = mix(0.04, 0.13, pulse) * (0.6 + uIntensity*0.6);

        float dotV = smoothstep(dotSize, dotSize*0.4, d);

        vec2 mp = uMouse;
        mp.x *= aspect;
        float dm = length(p - mp);
        float mouseBoost = exp(-dm*2.2) * 3.2 * uIntensity;
        float mouseHot = exp(-dm*5.0) * 2.5 * uIntensity;

        vec3 base = mix(vec3(0.027,0.035,0.055), vec3(0.039,0.086,0.157), uv.y);
        vec3 blue = vec3(0.153, 0.247, 0.400);
        vec3 gold = vec3(0.831, 0.635, 0.298);
        vec3 goldHi = vec3(0.95, 0.78, 0.48);

        float goldSeed = noise(cell*0.15 + uTime*0.05);
        float isGold = smoothstep(0.72, 0.85, goldSeed + mouseBoost*0.2);

        vec3 dotCol = mix(blue*0.6, gold, isGold);
        dotCol = mix(dotCol, goldHi, clamp(mouseBoost*0.7, 0.0, 1.0));

        vec3 col = base + dotCol * dotV * (0.5 + uIntensity*0.8 + mouseBoost*0.8);

        col += goldHi * mouseHot * 0.35;
        col += gold * mouseBoost * 0.12;

        float vig = smoothstep(1.4, 0.3, length(uv - vec2(0.5)));
        col *= mix(0.3, 1.0, vig);

        float edgeFade = smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.85, uv.y);

        gl_FragColor = vec4(col, edgeFade * 0.75);
      }
    `;

    const prog = gl.createProgram();
    if (!prog) return;
    const vsh = compileShader(gl, gl.VERTEX_SHADER, VS);
    const fsh = compileShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vsh || !fsh) return;
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    setupQuad(gl, prog);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uIntensity = gl.getUniformLocation(prog, 'uIntensity');

    const intensityMap: Record<ShaderIntensity, number> = { low: 0.4, medium: 0.9, high: 1.5 };
    const amt = intensityMap[intensity] ?? 0.9;

    let mouse = [0.5, 0.5];
    const onMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x >= -0.2 && x <= 1.2 && y >= -0.2 && y <= 1.2) mouse = [x, y];
    };
    window.addEventListener('mousemove', onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      if (visible) {
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouse[0], mouse[1]);
        gl.uniform1f(uIntensity, amt);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`shader-field ${className}`}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export function ShaderAurora({ intensity = 'medium', className = '' }: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.style.background =
        'linear-gradient(180deg, #07090E 0%, #0A1628 50%, #07090E 100%)';
      return;
    }

    const fs = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uRes;
      uniform vec2 uMouse;
      uniform float uIntensity;

      vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
      float snoise(vec2 v){
        const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i=floor(v+dot(v,C.yy));
        vec2 x0=v-i+dot(i,C.xx);
        vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
        vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
        i=mod289(i);
        vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
        vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0); m=m*m; m=m*m;
        vec3 x=2.0*fract(p*C.www)-1.0;
        vec3 h=abs(x)-0.5;
        vec3 ox=floor(x+0.5);
        vec3 a0=x-ox;
        m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
        vec3 g;
        g.x=a0.x*x0.x+h.x*x0.y;
        g.yz=a0.yz*x12.xz+h.yz*x12.yw;
        return 130.0*dot(m,g);
      }

      float aurora(vec2 uv, float t, float offset, float speed){
        float wave = snoise(vec2(uv.x*2.5 + offset, t*speed));
        float wave2 = snoise(vec2(uv.x*5.0 + offset*1.7, t*speed*1.3)) * 0.4;
        float center = 0.5 + wave*0.3 + wave2;
        float dist = abs(uv.x - center);
        float shimmer = 0.8 + 0.2 * snoise(vec2(uv.y*8.0, t*0.8 + offset));
        float thickness = mix(0.08, 0.22, smoothstep(0.0, 1.0, uv.y));
        float ribbon = smoothstep(thickness, 0.0, dist) * shimmer;
        ribbon *= smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.75, uv.y);
        return ribbon;
      }

      void main(){
        vec2 uv = vUv;
        float t = uTime * 0.15 * uIntensity;

        vec3 base = mix(vec3(0.027,0.035,0.055), vec3(0.039,0.070,0.120), uv.y);

        float a1 = aurora(uv, t, 1.3, 1.0);
        float a2 = aurora(vec2(uv.x*0.85+0.1, uv.y), t, 5.7, 0.7);
        float a3 = aurora(vec2(uv.x*1.2-0.15, uv.y), t, 9.2, 1.3);

        vec3 gold = vec3(0.831, 0.635, 0.298);
        vec3 goldHi = vec3(0.95, 0.78, 0.48);
        vec3 blue = vec3(0.20, 0.38, 0.58);

        vec3 col = base;
        col += blue * a1 * 0.4 * uIntensity;
        col += gold * a2 * 0.55 * uIntensity;
        col += goldHi * a3 * 0.35 * uIntensity;

        float dm = length(uv - uMouse);
        col += gold * exp(-dm*3.0) * 0.15 * uIntensity;

        vec2 starUv = uv * vec2(uRes.x/uRes.y, 1.0) * 200.0;
        vec2 sCell = floor(starUv);
        float starSeed = fract(sin(dot(sCell, vec2(12.9898, 78.233))) * 43758.5453);
        float star = step(0.996, starSeed) * (0.5 + 0.5*sin(uTime*2.0 + starSeed*10.0));
        star *= smoothstep(0.5, 0.95, uv.y);
        col += vec3(0.95, 0.85, 0.6) * star * 0.6;

        float edgeFade = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);

        gl_FragColor = vec4(col, edgeFade);
      }
    `;

    const prog = gl.createProgram();
    if (!prog) return;
    const vsh = compileShader(gl, gl.VERTEX_SHADER, VS);
    const fsh = compileShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vsh || !fsh) return;
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    setupQuad(gl, prog);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uIntensity = gl.getUniformLocation(prog, 'uIntensity');

    const intensityMap: Record<ShaderIntensity, number> = { low: 0.45, medium: 1.0, high: 1.7 };
    const amt = intensityMap[intensity] ?? 1.0;

    let mouse = [0.5, 0.5];
    const onMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x >= -0.2 && x <= 1.2 && y >= -0.2 && y <= 1.2) mouse = [x, y];
    };
    window.addEventListener('mousemove', onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      if (visible) {
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouse[0], mouse[1]);
        gl.uniform1f(uIntensity, amt);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`shader-aurora ${className}`}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
