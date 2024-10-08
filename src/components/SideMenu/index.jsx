import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {  
    create as createIcon,
    layers,
    layersOutline,
} from "ionicons/icons";
import "./menu.css"



const appPages = [
    {
        title: "Form",
        url: "/form",
        iosIcon: createIcon,
        mdIcon: createIcon
    },
    {
        title: "List",
        url: "/list",
        iosIcon: layersOutline,
        mdIcon: layers
    }
];



export default function SideMenu() {
    const location = useLocation();

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Crud App</IonListHeader>
                    <IonNote>In Development...</IonNote>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};
