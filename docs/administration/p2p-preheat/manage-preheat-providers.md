---
title: Gestisci le istanze del provider di preriscaldamento
weight: 20
---

{{< note >}}
Per creare e gestire le istanze del provider di preriscaldamento P2P, è necessario essere un amministratore di sistema.
{{< /note >}}

## Crea istanza del provider di preriscaldamento

Per preriscaldare le immagini, è necessario prima creare istanze del provider di preriscaldamento.

1. Vai alla voce **Distribuzioni** in **Amministrazione** e fai clic su **+NUOVA ISTANZA** per aprire la finestra di dialogo di creazione.

    ![finestra di dialogo di creazione](../../../img/p2p-preheat/creation-dialog.png)

1. Per il **Provider**, seleziona **Dragonfly** o **Kraken** in base all'ambiente P2P di destinazione.
1. Immettere un nome appropriato e una descrizione (facoltativa) per la nuova istanza del provider P2P.
1. Immettere l'endpoint API di preriscaldamento del provider P2P di destinazione.
    es.: http://my-provider.com o http://my-provider.com:8002
1. Selezionare la **Modalità di autenticazione** corretta in base alla configurazione del provider P2P di destinazione e, se richiesto, inserire le credenziali di accesso necessarie. 
Sono supportate le seguenti modalità:
Finora sono supportate le seguenti modalità:
    - **NONE**: nessuna autenticazione necessaria.
    - **Base**: sono richiesti la modalità di autenticazione di base HTTP, **Nome utente** e **Password**.
    - **OAuth**: modalità token portatore OAuth, il portatore **Token** è obbligatorio.
1. Seleziona o deseleziona la casella di controllo **Abilita** per abilitare/disattivare l'istanza dopo la creazione.
1. Facoltativamente, selezionare la casella di controllo **Ignora verifica del certificato**.

   Seleziona la casella di controllo se l'istanza del provider di preriscaldamento utilizza un certificato autofirmato o non attendibile.
1. Fare clic sul pulsante **TEST CONNESSIONE** per testare la connettività dell'istanza in creazione.
1. Se il test di connettività ha esito positivo, fare clic sul pulsante **OK** per salvare l'istanza di creazione.

## Gestisci le istanze del provider di preriscaldamento

Le istanze del provider di preriscaldamento configurate esistenti sono elencate nella vista DataGrid.

{{< note >}}
Nella vista viene mostrato anche lo stato di integrità delle istanze del provider gestito. Se la connettività del provider 
l'istanza è ok, la colonna dello stato sarà contrassegnata con **Sano** in una casella verde. 
{{< /note >}}

  ![istanze del fornitore](../../../img/p2p-preheat/provider-instances.png)

Seleziona l'istanza del provider selezionando la casella di controllo nella parte anteriore della riga, fai clic su **AZIONI** per aprire il menu a discesa.

  ![azioni](../../../img/p2p-preheat/actions.png)

1. Fare clic su **Modifica** per aprire la finestra di dialogo di modifica per apportare modifiche all'istanza del provider selezionato.
1. Fare clic su **Abilita**/**Disattiva** per abilitare/disattivare l'istanza del provider selezionato se è disabilitata/disattivata.
3. Fare clic su **Elimina** per eliminare l'istanza del provider selezionata.

{{< note >}}
È possibile eliminare solo le istanze del provider P2P a cui non fa riferimento alcuna politica di preriscaldamento. Elimina tutto il relativo 
preriscaldare i criteri e quindi riprovare a eliminarli. 
{{< /note >}}

## Cosa fare dopo

Dopo aver aggiunto le istanze del provider di preriscaldamento, ora puoi andare al tuo progetto per creare policy di preriscaldamento su [preriscaldare le immagini](../../working-with-projects/working-with-images/preheat-images.md).
