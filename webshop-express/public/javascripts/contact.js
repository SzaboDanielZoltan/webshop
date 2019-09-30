function mailUs(ev) {
    let emailContent = document.querySelectorAll('.emailText');
    const emailString = `mailto:jnmako@gmail.com?subject=${emailContent[3].value}&body=
    Dear Madam/Sir,%0D%0A
     %0D%0A
     %0D%0A${emailContent[4].value}
     %0D%0A
     %0D%0ABest regard: ${emailContent[0].value}
     %0D%0A${emailContent[1].value}
     %0D%0A${emailContent[2].value}`
        ;
    window.location.href = emailString;
};
