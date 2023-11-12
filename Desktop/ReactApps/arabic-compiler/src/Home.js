import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Card from 'react-bootstrap/Card';
import './App.css';

function Home() {

    const { t } = useTranslation();
  return (
    <div className='position-absolute'>
    <div className="full-viewport text-center bg-color d-flex align-items-center justify-content-center flex-column">
        
      <h1>{t("homeTitle")}</h1>
      <h2>{t("homeText")}</h2>
      <a class="btn btn-primary btn-lg" href="/lessons" role="button">{t("lessons")}</a>
    </div>
    <div className="full-viewport text-center bg-color d-flex align-items-center  flex-column">
        <div>
            <h1>{t("featuresTitle")}</h1>
        </div>
        <div className="d-flex flex-row flex-wrap">
            <Card  className="m-3" style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>{t("featuresText")}</Card.Title>
                <Card.Text>
                    {t("featuresText")}
                </Card.Text>
            </Card.Body>
            </Card>
            <Card  className="m-3" style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>{t("featuresText")}</Card.Title>
                <Card.Text>
                    {t("featuresText")}
                </Card.Text>
            </Card.Body>
            </Card>
            <Card  className="m-3" style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>{t("featuresText")}</Card.Title>
                <Card.Text>
                    {t("featuresText")}
                </Card.Text>
            </Card.Body>
            </Card>
            
            
        </div>
        
        
    </div>
    </div>
  );
}

export default Home;