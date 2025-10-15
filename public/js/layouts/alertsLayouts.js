function alertSystem(message, status) {
    setTimeout(() => {
        $divAlerts = document.querySelector('#div-alerts');

        $divAlerts.innerHTML = `<div class="alert ${status ? 'alert-success' : 'alert-danger'} alert-dismissible fade show alert-flutuante" role="alert">
                                    ${message}
                                    
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>`;
    }, 300);
}