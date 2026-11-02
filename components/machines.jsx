// SVG drawings for the visual "Build the machine" game. Simplified, not to scale.
const S="#1b2233",B="#cfd6e4",P="#2a4a8a",G="#e0b252",D="#444c5c",M="#7ad7ee";
const sw={stroke:S,strokeWidth:1.5};
export const MACHINES={
spirit:{ground:"#8c3d1f",parts:[
{id:"wheels",label:"Wheels",view:[118,150,164,40],hit:[120,152,160,36],draw:()=><g fill={D} {...sw}>{[140,200,260].map(x=><g key={x}><circle cx={x} cy="170" r="18"/><circle cx={x} cy="170" r="6" fill={B}/></g>)}</g>},
{id:"computer",label:"Computer",view:[148,106,104,50],hit:[150,108,100,44],draw:()=><g {...sw}><rect x="150" y="108" width="100" height="46" rx="6" fill={B}/><circle cx="168" cy="131" r="5" fill={G}/><rect x="185" y="124" width="50" height="14" rx="3" fill={D}/></g>},
{id:"solar",label:"Solar panel",view:[116,82,180,24],hit:[120,86,172,16],draw:()=><g {...sw}><polygon points="120,102 280,102 292,86 132,86" fill={P}/><line x1="173" y1="86" x2="167" y2="102"/><line x1="213" y1="86" x2="207" y2="102"/><line x1="253" y1="86" x2="247" y2="102"/></g>},
{id:"camera",label:"Camera",view:[156,42,34,68],hit:[160,44,26,40],draw:()=><g {...sw}><line x1="172" y1="108" x2="172" y2="60" strokeWidth="3"/><rect x="159" y="44" width="28" height="16" rx="3" fill={B}/><circle cx="173" cy="52" r="4" fill={M}/></g>},
{id:"antenna",label:"Antenna",view:[228,48,42,42],hit:[232,52,34,32],draw:()=><g {...sw}><line x1="246" y1="86" x2="246" y2="68" strokeWidth="3"/><ellipse cx="250" cy="62" rx="17" ry="7" fill={B} transform="rotate(-25 250 62)"/></g>}]},
"apollo11-retroreflector":{ground:"#5b5e66",parts:[
{id:"stand",label:"Stand",view:[128,138,144,58],hit:[130,150,140,46],draw:()=><g {...sw}><rect x="130" y="184" width="140" height="10" rx="4" fill="#8a8d94"/><line x1="170" y1="184" x2="178" y2="140" strokeWidth="4"/><line x1="230" y1="184" x2="222" y2="140" strokeWidth="4"/></g>},
{id:"frame",label:"Panel",view:[143,54,114,92],hit:[145,56,110,88],draw:()=><rect x="145" y="56" width="110" height="88" rx="8" fill={B} stroke={S} strokeWidth="2"/>},
{id:"mirrors",label:"Mirrors",view:[158,74,84,56],hit:[160,76,80,52],draw:()=><g {...sw} fill={M}>{[88,118].flatMap(y=>[172,200,228].map(x=><circle key={x+"-"+y} cx={x} cy={y} r="11"/>))}</g>}]},
surveyor3:{ground:"#5b5e66",parts:[
{id:"legs",label:"Legs",view:[126,138,148,66],hit:[128,150,144,52],draw:()=><g stroke={S} strokeWidth="4" fill={D}><line x1="200" y1="140" x2="140" y2="192"/><line x1="200" y1="140" x2="260" y2="192"/><line x1="200" y1="140" x2="200" y2="196"/><ellipse cx="140" cy="194" rx="12" ry="4"/><ellipse cx="260" cy="194" rx="12" ry="4"/><ellipse cx="200" cy="198" rx="12" ry="4"/></g>},
{id:"body",label:"Body",view:[163,96,74,48],hit:[165,98,70,44],draw:()=><g {...sw}><rect x="165" y="98" width="70" height="44" rx="8" fill={B}/><circle cx="200" cy="120" r="9" fill={D}/></g>},
{id:"camera",label:"Camera",view:[186,54,28,46],hit:[186,56,28,40],draw:()=><g {...sw}><line x1="200" y1="98" x2="200" y2="72" strokeWidth="3"/><rect x="188" y="56" width="24" height="16" rx="3" fill={B}/><circle cx="200" cy="64" r="4" fill={M}/></g>},
{id:"scoop",label:"Soil scoop",view:[232,116,70,36],hit:[236,118,62,32],draw:()=><g {...sw}><line x1="235" y1="120" x2="285" y2="140" strokeWidth="3"/><polygon points="285,134 298,140 285,148" fill={D}/></g>},
{id:"radio",label:"Radio dish",view:[138,54,44,46],hit:[140,56,40,44],draw:()=><g {...sw}><line x1="176" y1="98" x2="160" y2="72" strokeWidth="3"/><ellipse cx="156" cy="66" rx="14" ry="6" fill={B} transform="rotate(-30 156 66)"/></g>}]},
insight:{ground:"#8c3d1f",parts:[
{id:"deck",label:"Deck",view:[116,138,168,56],hit:[118,138,164,56],draw:()=><g {...sw}><rect x="120" y="140" width="160" height="14" rx="3" fill={B}/><line x1="140" y1="154" x2="132" y2="192" strokeWidth="3"/><line x1="260" y1="154" x2="268" y2="192" strokeWidth="3"/></g>},
{id:"solar",label:"Solar panels",view:[24,64,352,96],hit:[[26,66,92,92],[282,66,92,92]],draw:()=><g {...sw} fill={P}><circle cx="72" cy="112" r="46"/><circle cx="328" cy="112" r="46"/><circle cx="72" cy="112" r="14" fill={G}/><circle cx="328" cy="112" r="14" fill={G}/><line x1="118" y1="128" x2="122" y2="145"/><line x1="282" y1="128" x2="278" y2="145"/></g>},
{id:"seis",label:"Seismometer",view:[174,170,52,30],hit:[176,172,48,28],draw:()=><path d="M178,196 a22,20 0 0,1 44,0 z" fill={G} {...sw}/>},
{id:"arm",label:"Robot arm",view:[240,150,60,40],hit:[242,152,58,36],draw:()=><g {...sw} fill="none"><polyline points="245,154 262,176 292,184" strokeWidth="3"/><circle cx="293" cy="184" r="4" fill={D}/></g>},
{id:"antenna",label:"Antenna",view:[132,88,44,54],hit:[134,90,40,50],draw:()=><g {...sw}><line x1="150" y1="140" x2="150" y2="108" strokeWidth="3"/><ellipse cx="154" cy="102" rx="16" ry="7" fill={B} transform="rotate(-20 154 102)"/></g>}]}};
