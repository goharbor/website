---
title: Crea account utente in modalità database
weight: 25
---
	
Nella modalità di autenticazione del database, l'amministratore di sistema Harbor crea manualmente gli account utente. 

1. Accedere all'interfaccia Harbor con un account che disponga dei privilegi di amministratore di sistema Harbor.
1. In **Amministrazione**, vai a **Utenti**.

    ![Crea un account utente](../../../img/create-user.png)
1. Fare clic su **Nuovo utente**.
1. Immettere le informazioni sul nuovo utente.

    ![Fornire informazioni sull'utente](../../../img/new-user.png)

    - Il nome utente deve essere univoco nel sistema Harbor
    - L'indirizzo email deve essere univoco nel sistema Harbor
    - La password deve contenere almeno 8 caratteri con 1 lettera minuscola, 1 lettera maiuscola e 1 carattere numerico

Se gli utenti dimenticano la password, devono chiedere all'amministratore di [reimpostare la password](./reset-user-password.md)
