/**
 * @jsx React.DOM
 */

var React = require('react');

// resize 拖拽元素的宽度/高度
var RESIZE_BAR_W = 2;

var isDrag = false, dragTarget=undefined;
function getPixalValue(str){
    return Number(str.substr(0, str.length-2));
}

var Resizeable = React.createClass({
    propTypes:{
        id: React.PropTypes.string.isRequired
    },
    componentDidMount: function() {
        this.getCtnStyle();
        this.getResizeEle();
        // console.log(this.ctnStyle);
    },
    render: function() {
        return (
            <div id={this.props.id}
            className={'resizeable ' + this.props.classes || ''}
            onMouseUp={this._mouseUp}
            onMouseMove={this._mouseMove}  >

                {this.props.verLeftNode}

                <div className="resize-ver"
                onMouseDown={this._mouseDown}
                onMouseMove={this._mouseMove}
                onMouseUp={this._mouseUp} />
                {this.props.horTopNode}

                <div className="resize-hor"
                onMouseDown={this._mouseDown}
                onMouseMove={this._mouseMove}
                onMouseUp={this._mouseUp} />

                {this.props.horBottomNode}

            </div>
        );
    },
    _mouseDown: function(e){
        isDrag = true;
        dragTarget = e.target.className;
    },
    _mouseMove: function(e){
        if(isDrag && dragTarget){
            // console.log(e);
            if(dragTarget =='resize-ver'){
                this._onDragVer(e);
            }
            else{
                this._onDragHor(e);
            }
        }
    },
    _mouseUp: function(){
        isDrag = false;
    },
    _onDragVer: function(e){
        // console.log(e.pageX);
        var leftW = e.pageX - this.ctnStyle.x;
        var rightW = this.ctnStyle.width - leftW - RESIZE_BAR_W;
        this.ele.ver.style.left = leftW+'px';
        this.ele.hor.style.left = leftW+'px';

        // callback( leftW, rightW )
    },
    _onDragHor: function(e){
        var topH = e.pageY - this.ctnStyle.y;
        var bottomH = this.ctnStyle.height - topH - RESIZE_BAR_W;
        this.ele.hor.style.top = topH+'px';
        // callback( topH, bottomH );
    },
    ctnStyle: {
        x: 0,
        y: 0,
        height: 0,
        width: 0
    },
    ele: {
        ver: null,
        hor: null
    },
    getCtnStyle: function(){
        var resizeEl = document.querySelector('#' + this.props.id);
        this.ctnStyle.x = resizeEl.offsetLeft;
        this.ctnStyle.y = resizeEl.offsetTop;
        var cstyle = window.getComputedStyle(resizeEl);
        this.ctnStyle.height = getPixalValue(cstyle.height);
        this.ctnStyle.width = getPixalValue(cstyle.width);
    },
    getResizeEle: function(){
        this.ele.ver = document.querySelector('.resize-ver');
        this.ele.hor = document.querySelector('.resize-hor');
    }
});

module.exports = Resizeable;