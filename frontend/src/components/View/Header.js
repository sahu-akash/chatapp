import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestionCircle, faExclamationCircle,
    faCog,
} from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png" alt=' missing' />
                <span className="help-text">Meet</span>
            </div>
            <div>
                <FontAwesomeIcon className="icon-block" icon={faQuestionCircle} />
                <FontAwesomeIcon className="icon-block" icon={faExclamationCircle} />
                <FontAwesomeIcon className="icon-block" icon={faCog} />
            </div>
        </div>
    )
}
