import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import Form from "../pages/Form";
import List from "../pages/List";
import Header from "../components/Header";
import "./app.css"

export default function Routing(params) {

    return <IonPage>
        <IonRouterOutlet>
            {/* <Header> */}
            <Route path="/form" component={Form} />
            <Route path="/edit/:id" component={Form} />
            <Route path="/list" component={List} />
            <Redirect exact from="/" to="/form" />
            {/* </Header> */}
        </IonRouterOutlet>
    </IonPage>
}