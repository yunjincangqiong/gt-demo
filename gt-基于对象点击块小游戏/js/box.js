    var container = document.querySelector( 'div#container' );  
    function Box ( map ) {
        this.width = 20;
        this.height = 20;
        this.left = 0;
        this.top = 0;
        this.color = 'red';
        //创建小盒子实例对象时;执行以下代码
        this._div = document.createElement( 'div' );
        container.appendChild( this._div );
        this._div.className = '_div'; 
    }

    Box.prototype.random = function ( map ) {
        //随机位置
        var widthMax = map.offsetWidth / this.width - 1;
        var heightMax = map.offsetHeight / this.height - 1;
        this.left = suiji( 0, widthMax ) * this.width;
        this.top = suiji( 0, heightMax ) * this.height;
        this._div.style.left = this.left + 'px';
        this._div.style.top = this.top + 'px';
        //随机颜色
        var r = suiji( 0, 255 );
        var g = suiji( 0, 255 );
        var b = suiji( 0, 255 );
        this.color = 'rgb('+ r +','+ g +','+ b +')';
        this._div.style.backgroundColor = this.color;
    }

    //随机函数
    function suiji( min, max ) {
        return Math.floor( ( Math.random() * ( max - min + 1 ) ) )+ min;
    }

    
