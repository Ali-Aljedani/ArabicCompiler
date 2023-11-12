
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import './App.css';

function SignIn() {
    const { t } = useTranslation();
    const lessons = t("lessonsTitles", { returnObjects: true })
    console.log(lessons)
    return (
        <div className='position-absolute bg-color'>
            <form className="full-viewport m-auto form form-outline">

                <div class="form-outline mb-4">
                    <input type="email" id="form2Example1" class="form-control" />
                    <label class="form-label" for="form2Example1">{t("username")}</label>
                </div>


                <div class="form-outline mb-4">
                    <input type="password" id="form2Example2" class="form-control" />
                    <label class="form-label" for="form2Example2">{t("password")}</label>
                </div>
                <button type="button" class="btn btn-primary align-self-center btn-block mb-4">{t("signin")}</button>
            </form>
        </div>
    );
}

export default SignIn;