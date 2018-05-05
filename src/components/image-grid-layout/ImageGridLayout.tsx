import * as React from 'react';
import { showModal } from '../../actions';

const styles = require('./ImageGridLayout.scss');

interface ImageGridLayoutState {
    images: Array<any>
}

function getImages(): Promise<any> {
    let images = [
        require('../../assets/1.jpg'),
        require('../../assets/2.jpg'),
        require('../../assets/3.jpg'),
        require('../../assets/4.jpg'),
        require('../../assets/5.jpg'),
        require('../../assets/6.jpg'),
        require('../../assets/7.jpg'),
        require('../../assets/8.jpg'),
        require('../../assets/9.jpg'),
        require('../../assets/10.jpg'),
        require('../../assets/11.jpg'),
        require('../../assets/12.jpg'),
        require('../../assets/13.jpg'),
        require('../../assets/14.jpg'),
    ];
    images = images.concat(images);
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve(images);
        }, 300);
    });
}

function cloneArray(arr: any[]) {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
        a[i] = arr[i];
    }
    return a;
}

export default class ImageGridLayout extends React.Component<any, ImageGridLayoutState> {
    private ref: any;
    private containerWidth: number;
    private maxHeight = 180;
    private minHeight = 10;
    private loadedCount = 0;
    private margin: number = 3;
    private cache: Array<any> = [];
    private isLoadingMore: boolean = false;

    constructor(props) {
        super(props);

        this.state = { images: [] };

        getImages().then(images => {
            this.setState({ images: images.map(src => ({ src, height: this.maxHeight })) });
        });

        this.ref = React.createRef();
    }

    onLoad(i, ev) {
        let img = this.state.images[i];
        let ratio = ev.target.naturalWidth / ev.target.naturalHeight;
        this.cache[i] = this.cache[i] || {src: img.src, height: img.height, ratio };
        this.loadedCount++;
        if (this.loadedCount >= this.state.images.length) {
            this.resize();
        }
    }

    resize() {
        const rows = this.adjust(this.cache, 2 * this.margin);
        let images = [];
        for (let i = 0; i < rows.length; i++) {
            images.push(...rows[i].images.map(v => {
                return { src: v.src, height: rows[i].height };
            }));
        }
        this.setState({ images });
    }

    generateRow(images, margin) {
        let row = {};
        let containerWidth = this.getContainerWidth();
        let height = this.maxHeight;
        let ratio = 0;
        let i = 0;
        while (i < images.length) {
            let img = images[i];
            ratio += img.ratio;
            i++;
            if (ratio * height + i * margin < containerWidth) continue;
            height = (containerWidth - i * margin) / ratio;
            if (height < this.minHeight) throw 'err';
            // height |= 0;
            Object.assign(row, { images: images.splice(0, i), height });
            return { row, images };
        }
        Object.assign(row, { images: images.splice(0, i), height });
        return { row, images };
    }

    adjust(images, margin) {
        let rows = [];
        images = cloneArray(images);
        while (images.length > 0) {
            let r = this.generateRow(images, margin);
            images = r.images;
            rows.push(r.row);
        }
        return rows;
    }

    onClick(v) {
        let { dispatch }: any = this.props;
        dispatch(showModal(v.src, '超高建筑', '摩天大楼（skyscraper）又称为超高层大楼，非常高的多层建筑物。起初为一、二十层的建筑，但是现在通常指超过四十层或五十层的高楼大厦。随着高层建筑在各地不同的发展，人们所认知的摩天大楼定义高度也略为不同。在中国大陆，建筑规范规定100米以上高度的属于超高层建筑；日本、法国、规定义超过60米就属于超高层建筑；在美国，则普遍认为152米(500英尺)以上的建筑为摩天大楼。'));
    }

    onScroll(ev) {
        if (this.isLoadingMore) return;
        let h = ev.target.scrollHeight - ev.target.offsetHeight;
        let t = ev.target.scrollTop;
        if (t > h - this.maxHeight) {
            this.isLoadingMore = true;
            getImages().then(images => {
                this.state.images.push(...images.map(src => ({ src, height: this.maxHeight })))
                this.setState({images: this.state.images});
                this.isLoadingMore = false;
            })
        }
    }

    getItems() {
        if (!this.state.images || this.state.images.length == 0) return [];
        const margin = this.margin;
        const images = this.state.images;
        return images.map((v, i) => {
            return (
                <li key={i} className={styles['image-item']} style={{ margin }} onClick={this.onClick.bind(this, v)}>
                    <img onLoad={this.onLoad.bind(this, i)} src={v.src} style={{ height: v.height }} />
                </li>
            );
        });
    }

    getContainerWidth() {
        let current = this.ref.current;
        this.containerWidth = current.clientWidth - 20;
        return this.containerWidth;
    }

    componentDidMount() {
        window.onresize = () => {
            this.resize();
        }
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    render() {
        const images = this.getItems();
        let className = styles.container + ' ' + styles.clearfix;
        return (
            <ul onScroll={this.onScroll.bind(this)} ref={this.ref} className={className} style={{ padding: '10px' }}>{images}</ul>
        );
    }
}