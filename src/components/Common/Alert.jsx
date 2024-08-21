import React from 'react';
import { IonAlert, IonButton } from '@ionic/react';

export default function Alert({ handleOk, handleCancel, header = "", trigger = "present-alert" }) {
    return (
        <>
            <IonAlert
                header={header}
                trigger={trigger}
                buttons={[
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                            if (handleCancel) handleCancel()
                        },
                    },
                    {
                        text: 'Yes',
                        role: 'confirm',
                        handler: () => {
                            if (handleOk) handleOk()
                        },
                    },
                ]}
                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
        </>
    );
}
