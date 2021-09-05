import React from 'react';
import styles from './Footer.module.scss'

export default function Footer(){
    return(
        <div className={styles.footer}>
            <i className="fa fa-facebook"></i>
            <i className="fa fa-github"></i>
            <i className="fa fa-linkedin"></i>
            <div className="copyright">
                <p>©2021 Pawan Sharma</p>
            </div>
        </div>
    )
}