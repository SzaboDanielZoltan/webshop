const express = require('express');
const router = express.Router();


/* GET contact page. */
router.get('/', (req, res, next) => {
  res.render('contact');
});

function mailUs() {
console.log(this.message)
 this.emailString = `mailto:jnmako@gmail.com?subject=${this.subject}&body=
 Dear Madam/Sir,%0D%0A
 %0D%0A
 ${this.message}
 %0D%0A
 %0D%0ABest regard: ${this.name}`;
window.location.href = this.emailString;
};

module.exports = router;