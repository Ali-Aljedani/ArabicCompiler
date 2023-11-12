
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import './App.css';

function Lessons() {
  const { t } = useTranslation();
  const lessons = t("lessonsTitles",{ returnObjects: true })
  
  return (
    <div className='position-absolute'>
        <div className="full-viewport text-center bg-color d-flex align-items-center  flex-column">
            
        <h1>{t("lessons")}</h1>
        {lessons.map( lesson => <a class="btn btn-primary btn-lg m-3" href="/lesson" role="button">{lesson}</a>)}
        
        </div>
    </div>
  );
}

export default Lessons;