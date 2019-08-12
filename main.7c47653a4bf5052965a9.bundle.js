(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Resizable=void 0;var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_resizer=__webpack_require__(532),_fastMemoize=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__(533));function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}const DEFAULT_SIZE={width:"auto",height:"auto"},clamp=(0,_fastMemoize.default)((n,min,max)=>Math.max(Math.min(n,max),min)),snap=(0,_fastMemoize.default)((n,size)=>Math.round(n/size)*size),hasDirection=(0,_fastMemoize.default)((dir,target)=>new RegExp(dir,"i").test(target)),findClosestSnap=(0,_fastMemoize.default)((n,snapArray,snapGap=0)=>{const closestGapIndex=snapArray.reduce((prev,curr,index)=>Math.abs(curr-n)<Math.abs(snapArray[prev]-n)?index:prev,0),gap=Math.abs(snapArray[closestGapIndex]-n);return 0===snapGap||gap<snapGap?snapArray[closestGapIndex]:n}),endsWith=(0,_fastMemoize.default)((str,searchStr)=>str.substr(str.length-searchStr.length,searchStr.length)===searchStr),getStringSize=(0,_fastMemoize.default)(n=>"auto"===(n=n.toString())?n:endsWith(n,"px")?n:endsWith(n,"%")?n:endsWith(n,"vh")?n:endsWith(n,"vw")?n:endsWith(n,"vmax")?n:endsWith(n,"vmin")?n:`${n}px`),calculateNewMax=(0,_fastMemoize.default)((parentSize,maxWidth,maxHeight,minWidth,minHeight)=>{if(maxWidth&&"string"==typeof maxWidth&&endsWith(maxWidth,"%")){const ratio=Number(maxWidth.replace("%",""))/100;maxWidth=parentSize.width*ratio}if(maxHeight&&"string"==typeof maxHeight&&endsWith(maxHeight,"%")){const ratio=Number(maxHeight.replace("%",""))/100;maxHeight=parentSize.height*ratio}if(minWidth&&"string"==typeof minWidth&&endsWith(minWidth,"%")){const ratio=Number(minWidth.replace("%",""))/100;minWidth=parentSize.width*ratio}if(minHeight&&"string"==typeof minHeight&&endsWith(minHeight,"%")){const ratio=Number(minHeight.replace("%",""))/100;minHeight=parentSize.height*ratio}return{maxWidth:void 0===maxWidth?void 0:Number(maxWidth),maxHeight:void 0===maxHeight?void 0:Number(maxHeight),minWidth:void 0===minWidth?void 0:Number(minWidth),minHeight:void 0===minHeight?void 0:Number(minHeight)}}),definedProps=["style","className","grid","snap","bounds","size","defaultSize","minWidth","minHeight","maxWidth","maxHeight","lockAspectRatio","lockAspectRatioExtraWidth","lockAspectRatioExtraHeight","enable","handleStyles","handleClasses","handleWrapperStyle","handleWrapperClass","children","onResizeStart","onResize","onResizeStop","handleComponent","scale","resizeRatio","snapGap"],baseClassName="__resizable_base__";class Resizable extends React.PureComponent{get parentNode(){return this.resizable?this.resizable.parentNode:null}get propsSize(){return this.props.size||this.props.defaultSize||DEFAULT_SIZE}get base(){const parent=this.parentNode;if(!parent)return;const children=[].slice.call(parent.children);for(const n of children)if(n instanceof HTMLElement&&n.classList.contains(baseClassName))return n}get size(){let width=0,height=0;if("undefined"!=typeof window&&this.resizable){const orgWidth=this.resizable.offsetWidth,orgHeight=this.resizable.offsetHeight,orgPosition=this.resizable.style.position;"relative"!==orgPosition&&(this.resizable.style.position="relative"),width="auto"!==this.resizable.style.width?this.resizable.offsetWidth:orgWidth,height="auto"!==this.resizable.style.height?this.resizable.offsetHeight:orgHeight,this.resizable.style.position=orgPosition}return{width:width,height:height}}get sizeStyle(){const{size:size}=this.props,getSize=key=>{if(void 0===this.state[key]||"auto"===this.state[key])return"auto";if(this.propsSize&&this.propsSize[key]&&endsWith(this.propsSize[key].toString(),"%")){if(endsWith(this.state[key].toString(),"%"))return this.state[key].toString();const parentSize=this.getParentSize();return`${Number(this.state[key].toString().replace("px",""))/parentSize[key]*100}%`}return getStringSize(this.state[key])};return{width:size&&void 0!==size.width&&!this.state.isResizing?getStringSize(size.width):getSize("width"),height:size&&void 0!==size.height&&!this.state.isResizing?getStringSize(size.height):getSize("height")}}constructor(props){super(props),_defineProperty(this,"ratio",1),_defineProperty(this,"resizable",null),_defineProperty(this,"parentLeft",0),_defineProperty(this,"parentTop",0),_defineProperty(this,"resizableLeft",0),_defineProperty(this,"resizableTop",0),_defineProperty(this,"targetLeft",0),_defineProperty(this,"targetTop",0),this.state={isResizing:!1,resizeCursor:"auto",width:void 0===(this.propsSize&&this.propsSize.width)?"auto":this.propsSize&&this.propsSize.width,height:void 0===(this.propsSize&&this.propsSize.height)?"auto":this.propsSize&&this.propsSize.height,direction:"right",original:{x:0,y:0,width:0,height:0}},this.onResizeStart=this.onResizeStart.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseUp=this.onMouseUp.bind(this),"undefined"!=typeof window&&(window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseleave",this.onMouseUp),window.addEventListener("touchmove",this.onMouseMove),window.addEventListener("touchend",this.onMouseUp))}getParentSize(){if(!this.base||!this.parentNode)return{width:window.innerWidth,height:window.innerHeight};let wrapChanged=!1;const wrap=this.parentNode.style.flexWrap,minWidth=this.base.style.minWidth;"wrap"!==wrap&&(wrapChanged=!0,this.parentNode.style.flexWrap="wrap"),this.base.style.position="relative",this.base.style.minWidth="100%";const size={width:this.base.offsetWidth,height:this.base.offsetHeight};return this.base.style.position="absolute",wrapChanged&&(this.parentNode.style.flexWrap=wrap),this.base.style.minWidth=minWidth,size}componentDidMount(){this.setState({width:this.state.width||this.size.width,height:this.state.height||this.size.height});const parent=this.parentNode;if(!(parent instanceof HTMLElement))return;if(this.base)return;const element=document.createElement("div");element.style.width="100%",element.style.height="100%",element.style.position="absolute",element.style.transform="scale(0, 0)",element.style.left="0",element.style.flex="0",element.classList?element.classList.add(baseClassName):element.className+=baseClassName,parent.appendChild(element)}componentWillUnmount(){if("undefined"!=typeof window){window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseleave",this.onMouseUp),window.removeEventListener("touchmove",this.onMouseMove),window.removeEventListener("touchend",this.onMouseUp);const parent=this.parentNode;if(!this.base||!parent)return;if(!(parent instanceof HTMLElement&&this.base instanceof Node))return;parent.removeChild(this.base)}}createSizeForCssProperty(newSize,kind){const propsSize=this.propsSize&&this.propsSize[kind];return"auto"!==this.state[kind]||this.state.original[kind]!==newSize||void 0!==propsSize&&"auto"!==propsSize?newSize:"auto"}calculateNewMaxFromBoundary(maxWidth,maxHeight){if("parent"===this.props.bounds){const parent=this.parentNode;if(parent instanceof HTMLElement){const boundWidth=parent.offsetWidth+(this.parentLeft-this.resizableLeft),boundHeight=parent.offsetHeight+(this.parentTop-this.resizableTop);maxWidth=maxWidth&&maxWidth<boundWidth?maxWidth:boundWidth,maxHeight=maxHeight&&maxHeight<boundHeight?maxHeight:boundHeight}}else if("window"===this.props.bounds){if("undefined"!=typeof window){const boundWidth=window.innerWidth-this.resizableLeft,boundHeight=window.innerHeight-this.resizableTop;maxWidth=maxWidth&&maxWidth<boundWidth?maxWidth:boundWidth,maxHeight=maxHeight&&maxHeight<boundHeight?maxHeight:boundHeight}}else if(this.props.bounds instanceof HTMLElement){const boundWidth=this.props.bounds.offsetWidth+(this.targetLeft-this.resizableLeft),boundHeight=this.props.bounds.offsetHeight+(this.targetTop-this.resizableTop);maxWidth=maxWidth&&maxWidth<boundWidth?maxWidth:boundWidth,maxHeight=maxHeight&&maxHeight<boundHeight?maxHeight:boundHeight}return{maxWidth:maxWidth,maxHeight:maxHeight}}calculateNewSizeFromDirection(clientX,clientY){const scale=this.props.scale||1,resizeRatio=this.props.resizeRatio||1,{direction:direction,original:original}=this.state,{lockAspectRatio:lockAspectRatio,lockAspectRatioExtraHeight:lockAspectRatioExtraHeight,lockAspectRatioExtraWidth:lockAspectRatioExtraWidth}=this.props;let newWidth=original.width,newHeight=original.height;const extraHeight=lockAspectRatioExtraHeight||0,extraWidth=lockAspectRatioExtraWidth||0;return hasDirection("right",direction)&&(newWidth=original.width+(clientX-original.x)*resizeRatio/scale,lockAspectRatio&&(newHeight=(newWidth-extraWidth)/this.ratio+extraHeight)),hasDirection("left",direction)&&(newWidth=original.width-(clientX-original.x)*resizeRatio/scale,lockAspectRatio&&(newHeight=(newWidth-extraWidth)/this.ratio+extraHeight)),hasDirection("bottom",direction)&&(newHeight=original.height+(clientY-original.y)*resizeRatio/scale,lockAspectRatio&&(newWidth=(newHeight-extraHeight)*this.ratio+extraWidth)),hasDirection("top",direction)&&(newHeight=original.height-(clientY-original.y)*resizeRatio/scale,lockAspectRatio&&(newWidth=(newHeight-extraHeight)*this.ratio+extraWidth)),{newWidth:newWidth,newHeight:newHeight}}calculateNewSizeFromAspectRatio(newWidth,newHeight,max,min){const{lockAspectRatio:lockAspectRatio,lockAspectRatioExtraHeight:lockAspectRatioExtraHeight,lockAspectRatioExtraWidth:lockAspectRatioExtraWidth}=this.props,computedMinWidth=void 0===min.width?10:min.width,computedMaxWidth=void 0===max.width||max.width<0?newWidth:max.width,computedMinHeight=void 0===min.height?10:min.height,computedMaxHeight=void 0===max.height||max.height<0?newHeight:max.height,extraHeight=lockAspectRatioExtraHeight||0,extraWidth=lockAspectRatioExtraWidth||0;if(lockAspectRatio){const extraMinWidth=(computedMinHeight-extraHeight)*this.ratio+extraWidth,extraMaxWidth=(computedMaxHeight-extraHeight)*this.ratio+extraWidth,extraMinHeight=(computedMinWidth-extraWidth)/this.ratio+extraHeight,extraMaxHeight=(computedMaxWidth-extraWidth)/this.ratio+extraHeight,lockedMinWidth=Math.max(computedMinWidth,extraMinWidth),lockedMaxWidth=Math.min(computedMaxWidth,extraMaxWidth),lockedMinHeight=Math.max(computedMinHeight,extraMinHeight),lockedMaxHeight=Math.min(computedMaxHeight,extraMaxHeight);newWidth=clamp(newWidth,lockedMinWidth,lockedMaxWidth),newHeight=clamp(newHeight,lockedMinHeight,lockedMaxHeight)}else newWidth=clamp(newWidth,computedMinWidth,computedMaxWidth),newHeight=clamp(newHeight,computedMinHeight,computedMaxHeight);return{newWidth:newWidth,newHeight:newHeight}}setBoundingClientRect(){if("parent"===this.props.bounds){const parent=this.parentNode;if(parent instanceof HTMLElement){const parentRect=parent.getBoundingClientRect();this.parentLeft=parentRect.left,this.parentTop=parentRect.top}}if(this.props.bounds instanceof HTMLElement){const targetRect=this.props.bounds.getBoundingClientRect();this.targetLeft=targetRect.left,this.targetTop=targetRect.top}if(this.resizable){const{left:left,top:top}=this.resizable.getBoundingClientRect();this.resizableLeft=left,this.resizableTop=top}}onResizeStart(event,direction){let clientX=0,clientY=0;if(event.nativeEvent instanceof MouseEvent){if(clientX=event.nativeEvent.clientX,clientY=event.nativeEvent.clientY,3===event.nativeEvent.which)return}else event.nativeEvent instanceof TouchEvent&&(clientX=event.nativeEvent.touches[0].clientX,clientY=event.nativeEvent.touches[0].clientY);if(this.props.onResizeStart&&this.resizable){if(!1===this.props.onResizeStart(event,direction,this.resizable))return}this.props.size&&(void 0!==this.props.size.height&&this.props.size.height!==this.state.height&&this.setState({height:this.props.size.height}),void 0!==this.props.size.width&&this.props.size.width!==this.state.width&&this.setState({width:this.props.size.width})),this.ratio="number"==typeof this.props.lockAspectRatio?this.props.lockAspectRatio:this.size.width/this.size.height,this.setBoundingClientRect(),this.setState({original:{x:clientX,y:clientY,width:this.size.width,height:this.size.height},isResizing:!0,resizeCursor:window.getComputedStyle(event.target).cursor||"auto",direction:direction})}onMouseMove(event){if(!this.state.isResizing||!this.resizable)return;let{maxWidth:maxWidth,maxHeight:maxHeight,minWidth:minWidth,minHeight:minHeight}=this.props;const clientX=event instanceof MouseEvent?event.clientX:event.touches[0].clientX,clientY=event instanceof MouseEvent?event.clientY:event.touches[0].clientY,{direction:direction,original:original,width:width,height:height}=this.state,parentSize=this.getParentSize(),max=calculateNewMax(parentSize,maxWidth,maxHeight,minWidth,minHeight);maxWidth=max.maxWidth,maxHeight=max.maxHeight,minWidth=max.minWidth,minHeight=max.minHeight;let{newHeight:newHeight,newWidth:newWidth}=this.calculateNewSizeFromDirection(clientX,clientY);const boundaryMax=this.calculateNewMaxFromBoundary(maxWidth,maxHeight),newSize=this.calculateNewSizeFromAspectRatio(newWidth,newHeight,{width:boundaryMax.maxWidth,height:boundaryMax.maxHeight},{width:minWidth,height:minHeight});if(newWidth=newSize.newWidth,newHeight=newSize.newHeight,this.props.grid){const newGridWidth=snap(newWidth,this.props.grid[0]),newGridHeight=snap(newHeight,this.props.grid[1]),gap=this.props.snapGap||0;newWidth=0===gap||Math.abs(newGridWidth-newWidth)<=gap?newGridWidth:newWidth,newHeight=0===gap||Math.abs(newGridHeight-newHeight)<=gap?newGridHeight:newHeight}this.props.snap&&this.props.snap.x&&(newWidth=findClosestSnap(newWidth,this.props.snap.x,this.props.snapGap)),this.props.snap&&this.props.snap.y&&(newHeight=findClosestSnap(newHeight,this.props.snap.y,this.props.snapGap));const delta={width:newWidth-original.width,height:newHeight-original.height};if(width&&"string"==typeof width)if(endsWith(width,"%")){newWidth=`${newWidth/parentSize.width*100}%`}else if(endsWith(width,"vw")){newWidth=`${newWidth/window.innerWidth*100}vw`}else if(endsWith(width,"vh")){newWidth=`${newWidth/window.innerHeight*100}vh`}if(height&&"string"==typeof height)if(endsWith(height,"%")){newHeight=`${newHeight/parentSize.height*100}%`}else if(endsWith(height,"vw")){newHeight=`${newHeight/window.innerWidth*100}vw`}else if(endsWith(height,"vh")){newHeight=`${newHeight/window.innerHeight*100}vh`}this.setState({width:this.createSizeForCssProperty(newWidth,"width"),height:this.createSizeForCssProperty(newHeight,"height")}),this.props.onResize&&this.props.onResize(event,direction,this.resizable,delta)}onMouseUp(event){const{isResizing:isResizing,direction:direction,original:original}=this.state;if(!isResizing||!this.resizable)return;const delta={width:this.size.width-original.width,height:this.size.height-original.height};this.props.onResizeStop&&this.props.onResizeStop(event,direction,this.resizable,delta),this.props.size&&this.setState(this.props.size),this.setState({isResizing:!1,resizeCursor:"auto"})}updateSize(size){this.setState({width:size.width,height:size.height})}renderResizer(){const{enable:enable,handleStyles:handleStyles,handleClasses:handleClasses,handleWrapperStyle:handleWrapperStyle,handleWrapperClass:handleWrapperClass,handleComponent:handleComponent}=this.props;if(!enable)return null;const resizers=Object.keys(enable).map(dir=>!1!==enable[dir]?React.createElement(_resizer.Resizer,{key:dir,direction:dir,onResizeStart:this.onResizeStart,replaceStyles:handleStyles&&handleStyles[dir],className:handleClasses&&handleClasses[dir]},handleComponent&&handleComponent[dir]?handleComponent[dir]:null):null);return React.createElement("span",{className:handleWrapperClass,style:handleWrapperStyle},resizers)}render(){const extendsProps=Object.keys(this.props).reduce((acc,key)=>-1!==definedProps.indexOf(key)?acc:(acc[key]=this.props[key],acc),{});return React.createElement("div",_extends({ref:c=>{c&&(this.resizable=c)},style:{position:"relative",userSelect:this.state.isResizing?"none":"auto",...this.props.style,...this.sizeStyle,maxWidth:this.props.maxWidth,maxHeight:this.props.maxHeight,minWidth:this.props.minWidth,minHeight:this.props.minHeight,boxSizing:"border-box"},className:this.props.className},extendsProps),this.state.isResizing&&React.createElement("div",{style:{height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0)",cursor:`${this.state.resizeCursor||"auto"}`,opacity:0,position:"fixed",zIndex:9999,top:"0",left:"0",bottom:"0",right:"0"}}),this.props.children,this.renderResizer())}}exports.Resizable=Resizable,_defineProperty(Resizable,"defaultProps",{onResizeStart:()=>{},onResize:()=>{},onResizeStop:()=>{},enable:{top:!0,right:!0,bottom:!0,left:!0,topRight:!0,bottomRight:!0,bottomLeft:!0,topLeft:!0},style:{},grid:[1,1],lockAspectRatio:!1,lockAspectRatioExtraWidth:0,lockAspectRatioExtraHeight:0,scale:1,resizeRatio:1,snapGap:0})},226:function(module,exports,__webpack_require__){__webpack_require__(227),__webpack_require__(323),module.exports=__webpack_require__(324)},25:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.style=void 0;exports.style={display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1px #ddd",background:"#f0f0f0"}},324:function(module,exports,__webpack_require__){"use strict";(function(module){var _react=__webpack_require__(15);const req=__webpack_require__(530);(0,_react.configure)(function loadStories(){req.keys().forEach(filename=>req(filename))},module)}).call(this,__webpack_require__(7)(module))},530:function(module,exports,__webpack_require__){var map={"./aspect.stories.tsx":531,"./auto.stories.tsx":534,"./basic.stories.tsx":535,"./bounds.stories.tsx":536,"./extra.stories.tsx":537,"./handle.stories.tsx":538,"./max.stories.tsx":539,"./nested.stories.tsx":540,"./ratio.stories.tsx":541,"./scaled.stories.tsx":542,"./size.stories.tsx":543,"./snap.stories.tsx":544,"./vwvh.stories.tsx":545};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=530},531:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("aspect",module).add("default",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:300},lockAspectRatio:!0},"001"))}).call(this,__webpack_require__(7)(module))},532:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Resizer=function Resizer(props){return React.createElement("div",{className:props.className||"",style:{position:"absolute",userSelect:"none",...styles[props.direction],...props.replaceStyles||{}},onMouseDown:e=>{props.onResizeStart(e,props.direction)},onTouchStart:e=>{props.onResizeStart(e,props.direction)}},props.children)};var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8));const styles={top:{width:"100%",height:"10px",top:"-5px",left:"0px",cursor:"row-resize"},right:{width:"10px",height:"100%",top:"0px",right:"-5px",cursor:"col-resize"},bottom:{width:"100%",height:"10px",bottom:"-5px",left:"0px",cursor:"row-resize"},left:{width:"10px",height:"100%",top:"0px",left:"-5px",cursor:"col-resize"},topRight:{width:"20px",height:"20px",position:"absolute",right:"-10px",top:"-10px",cursor:"ne-resize"},bottomRight:{width:"20px",height:"20px",position:"absolute",right:"-10px",bottom:"-10px",cursor:"se-resize"},bottomLeft:{width:"20px",height:"20px",position:"absolute",left:"-10px",bottom:"-10px",cursor:"sw-resize"},topLeft:{width:"20px",height:"20px",position:"absolute",left:"-10px",top:"-10px",cursor:"nw-resize"}}},534:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("auto",module).add("default",()=>React.createElement(_src.Resizable,{style:_style.style},"001")).add("height",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:"auto"}},"001")).add("width",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:"auto",height:200}},"001"))}).call(this,__webpack_require__(7)(module))},535:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("basic",module).add("default",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:200}},"001"))}).call(this,__webpack_require__(7)(module))},536:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("bounds",module).add("parent",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:200},bounds:"parent"},"001")).add("window",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:200},bounds:"window"},"001"))}).call(this,__webpack_require__(7)(module))},537:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15);const wrapper={flex:1,display:"flex"},style={display:"flex",flexDirection:"column",background:"#f0f0f0",border:0,padding:0},content={flex:1,display:"flex",alignItems:"center",justifyContent:"center"},header={background:"#999999",color:"white",height:"50px",display:"flex",alignItems:"center",justifyContent:"center"},sidebar={background:"#999999",color:"white",width:"50px",display:"flex",alignItems:"center",justifyContent:"center"};(0,_react2.storiesOf)("extra",module).add("header",()=>React.createElement(_src.Resizable,{style:style,defaultSize:{width:400,height:275},lockAspectRatio:16/9,lockAspectRatioExtraHeight:50},React.createElement("div",{style:header},"Header"),React.createElement("div",{style:content},"001"))).add("sidebar",()=>React.createElement(_src.Resizable,{style:style,defaultSize:{width:450,height:275},lockAspectRatio:16/9,lockAspectRatioExtraHeight:50,lockAspectRatioExtraWidth:50},React.createElement("div",{style:header},"Header"),React.createElement("div",{style:wrapper},React.createElement("div",{style:sidebar},"Nav"),React.createElement("div",{style:content},"001"))))}).call(this,__webpack_require__(7)(module))},538:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const SouthEastArrow=()=>React.createElement("svg",{width:"20px",height:"20px",version:"1.1",viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"m70.129 67.086l1.75-36.367c-0.035156-2.6523-2.9414-3.6523-4.8164-1.7773l-8.4531 8.4531-17.578-17.574c-2.3438-2.3438-5.7188-1.5625-8.0586 0.78125l-13.078 13.078c-2.3438 2.3438-2.4141 5.0117-0.074219 7.3516l17.574 17.574-8.4531 8.4531c-1.875 1.875-0.83594 4.8203 1.8164 4.8555l36.258-1.8594c1.6836 0.019531 3.1328-1.2812 3.1133-2.9688z"})),CustomHandle=props=>React.createElement("div",_extends({style:{background:"#fff",borderRadius:"2px",border:"1px solid #ddd",height:"100%",width:"100%",padding:0},className:"SomeCustomHandle"},props)),BottomRightHandle=()=>React.createElement(CustomHandle,null,React.createElement(SouthEastArrow,null));(0,_react2.storiesOf)("handle",module).add("bottomRight",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:500,height:200},handleComponent:{bottomRight:React.createElement(BottomRightHandle,null)}},"bottomRight"))}).call(this,__webpack_require__(7)(module))},539:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("max",module).add("height",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:200},maxHeight:400},"001")).add("width",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:200},maxWidth:400},"001")).add("percentage",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:200,height:200},maxWidth:"30%",maxHeight:"50%"},"001"))}).call(this,__webpack_require__(7)(module))},540:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15);const style={display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1px #ddd",background:"#f0f0f0",padding:"10px"};(0,_react2.storiesOf)("nested",module).add("default",()=>React.createElement("div",{style:{width:"100%",height:"100%"}},React.createElement(_src.Resizable,{defaultSize:{width:"80%",height:"80%"},style:style},React.createElement(_src.Resizable,{defaultSize:{width:"80%",height:"80%"},style:style},"Nested"))))}).call(this,__webpack_require__(7)(module))},541:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("ratio",module).add("double",()=>React.createElement(_src.Resizable,{style:_style.style,resizeRatio:2,defaultSize:{width:200,height:200}},"001"))}).call(this,__webpack_require__(7)(module))},542:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("scaled",module).add("half",()=>React.createElement("div",{style:{transform:"scale(0.5)",transformOrigin:"0 0"}},React.createElement(_src.Resizable,{scale:.5,style:_style.style,defaultSize:{width:200,height:200}},"transform: scale(0.5)")))}).call(this,__webpack_require__(7)(module))},543:function(module,exports,__webpack_require__){"use strict";(function(module){Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("size",module).add("percentage",()=>React.createElement(Size,null));class Size extends React.Component{constructor(props){super(props),function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}(this,"state",{width:"30%",height:"20%"})}render(){return React.createElement(_src.Resizable,{style:_style.style,size:this.state,onResizeStop:(e,direction,ref,d)=>{this.setState({width:ref.style.width,height:ref.style.height})}},"001")}}exports.default=Size}).call(this,__webpack_require__(7)(module))},544:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("snapping",module).add("absolute",()=>React.createElement(_src.Resizable,{style:_style.style,snap:{x:[100,300,450],y:[100,300,450]},snapGap:20,defaultSize:{width:50,height:50}},"001")).add("grid",()=>React.createElement(_src.Resizable,{style:_style.style,grid:[100,100],snapGap:20,defaultSize:{width:50,height:50}},"001"))}).call(this,__webpack_require__(7)(module))},545:function(module,exports,__webpack_require__){"use strict";(function(module){var React=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};desc.get||desc.set?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,newObj}(__webpack_require__(8)),_src=__webpack_require__(17),_react2=__webpack_require__(15),_style=__webpack_require__(25);(0,_react2.storiesOf)("vw vh",module).add("vw",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:"50vw",height:"50vw"}},"001")).add("vh",()=>React.createElement(_src.Resizable,{style:_style.style,defaultSize:{width:"50vh",height:"50vh"}},"001"))}).call(this,__webpack_require__(7)(module))}},[[226,1,2]]]);
//# sourceMappingURL=main.7c47653a4bf5052965a9.bundle.js.map