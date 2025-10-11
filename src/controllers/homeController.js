function viewHome(req, res) {
    return res.renderLayout("home", { titulo: "Home", linkActive: "home" });
}

export default {
    viewHome
}