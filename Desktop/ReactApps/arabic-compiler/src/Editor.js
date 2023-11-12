import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import './App.css';

function Editor() {
    const { t } = useTranslation();
    return (
        <div className='position-absolute'>
            <div className="full-viewport bg-color d-flex flex-column">
                
                <div className="d-flex align-items-center flex-row">
                    <div className="full-width d-flex align-items-center flex-column">
                        <h2>{t("editorText")}</h2>
                        <textarea className="text-area m-1" id="exampleFormControlTextarea1" rows="500"></textarea>
                    </div>


                    <div className="full-width  d-flex align-items-center flex-column">
                        <h2>{t("editorConsole")}</h2>
                        <div className="text-area m-1 bg-black" id="exampleFormControlTextarea1" ></div>
                    </div>
                </div>
                <div className='align-self-center'>
                 <button className="btn btn-primary btn-lg m-3"  role="button">{t("editorRun")}</button>
                </div>
            </div>
            
            
        </div>
    );
}

export default Editor;