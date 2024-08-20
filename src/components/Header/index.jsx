import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function Header({ children }) {

    return <>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Crud App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Crud</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <>
                    {children}
                </>

            </IonContent>
        </IonPage>
    </>
}