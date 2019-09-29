
function mailUs() {
    console.log('krumpli')
     this.emailString = `mailto:jnmako@gmail.com?subject=${this.subject}&body=
     Dear Madam/Sir,%0D%0A
     %0D%0A
     ${this.message}
     %0D%0A
     %0D%0ABest regard: ${this.name}`;
    window.location.href = this.emailString;
    };
    