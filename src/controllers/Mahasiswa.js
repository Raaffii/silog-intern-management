

const tampilDashboard = (req, res) => {
    console.log(req.session.user);
    return res.render("home", {
        layout: 'layouts/main-layout',
        akun: req.session.user
    })
}


module.exports = { tampilDashboard }
