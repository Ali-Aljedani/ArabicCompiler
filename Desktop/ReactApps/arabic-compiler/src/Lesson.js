
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

function Lesson() {
    const { t } = useTranslation();
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    return (
        <div className='position-absolute'>
            <div className="full-viewport text-center bg-color d-flex align-items-center  flex-column">

                <Button
                    onClick={() => setOpen1(true)}
                    className="m-3"
                    aria-expanded={open1}
                >
                    {t("lessonStart")}
                </Button>
                <div style={{ minHeight: '150px' }}>
                    <Collapse in={open1} dimension="width">
                        <div >
                            <Card body style={{ width: '400px' }}>
                                {t("placeHolderText")}
                            </Card>
                            <div>
                                <Button
                                    onClick={() => setOpen2(true)}
                                    className="m-3"
                                    aria-expanded={open2}>
                                    {t("lessonNext")}
                                </Button>
                            </div>
                        </div>
                    </Collapse>
                    
                        <div style={{ minHeight: '150px' }}>
                            <Collapse in={open2} dimension="width">
                                <div id="example-collapse-text">
                                    <Card body style={{ width: '400px' }}>
                                        {t("placeHolderText")}
                                    </Card>
                                    <div>
                                        <Button
                                            onClick={() => setOpen3(!open3)}
                                            className="m-3"
                                            aria-expanded={open3}>
                                            {t("lessonNext")}
                                        </Button>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                        <div style={{ minHeight: '150px' }}>
                            <Collapse in={open3} dimension="width">
                                <div id="example-collapse-text">
                                    <Card body style={{ width: '400px' }}>
                                        {t("placeHolderText")}
                                    </Card>
                                </div>
                            </Collapse>
                        </div>
                    
                </div>

            </div>
        </div>
    );
}

export default Lesson;