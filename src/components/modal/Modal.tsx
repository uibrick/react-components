import * as React from 'react';

const styles = require('./Modal.scss');

export default class Modal extends React.Component<any, any> {
    render() {
        let { modal, onClickMask }: any = this.props;
        let { src, title, desc } = modal;
        let display = src ? 'block' : 'none';
        return (
            <div style={{ display }} className={styles['modal-container']}>
                <div onClick={onClickMask} className={styles.mask}></div>
                <div className={styles.body}>
                    <h2>{title}</h2>
                    <img src={src} />
                    <p>{desc}</p>
                </div>
            </div>
        );
    }
}