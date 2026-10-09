/* Compare numeric/algebraic distractors without executing question text. */
(function(){
  'use strict';
  function value(raw,x,y){
    let s=String(raw).replace(/\$/g,'').replace(/\\(?:left|right|,|;|!)/g,'').replace(/\{,\}/g,'.').replace(/\\(?:dfrac|tfrac)/g,'\\frac');
    // Reduce innermost TeX groups, preserving precedence.
    for(let i=0;i<12;i++){
      const before=s;
      s=s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,'(($1)/($2))').replace(/\\sqrt\[([2-9])\]\{([^{}]*)\}/g,'(($2)^(1/$1))').replace(/\\sqrt\{([^{}]*)\}/g,'(($1)^(1/2))').replace(/\^\{([^{}]*)\}/g,'^($1)');
      if(s===before)break;
    }
    // Numeric logarithms used by quiz templates, including k log_a b.
    s=s.replace(/\\log_(?:\{([\d.]+)\}|([\d.]+))\s*(\d+(?:\.\d+)?)(?:\^\((\d+)\))?/g,(_,a,b,arg,power)=>{
      const base=Number(a||b),n=Number(arg)**Number(power||1);
      return base>0&&base!==1&&n>0?'('+Math.log(n)/Math.log(base)+')':'?';
    });
    s=s.replace(/\\(?:cdot|times)/g,'*').replace(/\\pi/g,'p').replace(/[{}]/g,'('); // remaining groups/commands fail parsing
    s=s.replace(/\s+/g,'');
    if(!s||s.length>350||/[^\d.xyp+*/^()\-]/.test(s))return null;
    const tokens=s.match(/\d+(?:\.\d+)?|\.\d+|[xyp+*/^()\-]/g)||[];let pos=0;
    function atom(){let t=tokens[pos++];if(t==='('){let v=sum();if(tokens[pos++]!==')')throw Error();return v;}if(t==='x')return x;if(t==='y')return y;if(t==='p')return Math.PI;if(t&&/^(?:\d|\.)/.test(t))return Number(t);throw Error();}
    function power(){let a=atom();if(tokens[pos]==='^'){pos++;a=a**unary();}return a;}
    function unary(){if(tokens[pos]==='+'){pos++;return unary();}if(tokens[pos]==='-'){pos++;return -unary();}return power();}
    function product(){let a=unary();while(pos<tokens.length){const t=tokens[pos];if(t==='*'||t==='/'){pos++;const b=unary();a=t==='*'?a*b:a/b;}else if(t==='('||t==='x'||t==='y'||t==='p'||/^(?:\d|\.)/.test(t)){a*=unary();}else break;}return a;}
    function sum(){let a=product();while(tokens[pos]==='+'||tokens[pos]==='-'){let t=tokens[pos++],b=product();a=t==='+'?a+b:a-b;}return a;}
    try{let result=sum();return pos===tokens.length&&Number.isFinite(result)?result:null;}catch(_){return null;}
  }
  function equivalent(a,b){
    if(String(a).replace(/\s+/g,'')===String(b).replace(/\s+/g,''))return true;
    // These samples detect common duplicate polynomial/rational forms; unsupported
    // TeX stays text. This is a guard, not a general symbolic algebra proof.
    const aa=String(a).replace(/\$/g,'').split('='),bb=String(b).replace(/\$/g,'').split('=');
    if(aa.length===2&&bb.length===2){
      let ratio=null;
      return [[1.137,2.731],[2.419,-1.371],[-3.731,4.121],[5.123,-2.713],[-2.319,-4.193]].every(([x,y])=>{
        const al=value(aa[0],x,y),ar=value(aa[1],x,y),bl=value(bb[0],x,y),br=value(bb[1],x,y);
        if([al,ar,bl,br].some(v=>v===null))return false;
        const av=al-ar,bv=bl-br;
        if(Math.abs(bv)<1e-12)return Math.abs(av)<1e-12;
        if(ratio===null)ratio=av/bv;
        return Math.abs(ratio)>1e-12&&Math.abs(av-ratio*bv)<=1e-10*Math.max(1,Math.abs(av),Math.abs(ratio*bv));
      });
    }
    return [1.137,2.419,-3.731,5.123].every(x=>{let av=value(a,x,2.731),bv=value(b,x,2.731);return av!==null&&bv!==null&&Math.abs(av-bv)<=1e-10*Math.max(1,Math.abs(av),Math.abs(bv));});
  }
  window.quizEquivalent=equivalent;
  window.quizNumericValue=value;
})();
