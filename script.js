// Menu animation
const tl = gsap.timeline()

tl.fromTo('.link', {
    y: -50,
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    duration: 2, 
    stagger: 0.15
}, 1.5)

// SCROLL ANIMATION
function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
        if(elem.classList.contains("reveal-from-left")) {
            x = -100;
            y = 0;
        } else if (elem.classList.contains("reveal-from-right")) {
            x = 100;
    y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto"
    });
}
function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
}
document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view
        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) }, 
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
        });
        });
    });

// scroll menu animation 
gsap.to('.menu-rest', {
    scrollTrigger: {
        trigger: '.menu-container',
        scrub: true,
        start: '-40% center',
    },
    scale: 1.2,
    opacity: 1,
    y: 20,
    duration: 4
})

// Cards animation
gsap.from('.cards-contact-us', {
    scrollTrigger: {
        trigger: '.contact-us-main-group',
        scrub: true,
        start: '-40% center'
    },
    rotation: -50,
    duration: 1
})

// Button animation

if (window.innerWidth < 1200) {
    gsap.to('.btn-call', {
        scrollTrigger: {
            trigger: '.contact-us-main-group',
            scrub: true,
            start: '-40% center'
        },
        x: 175,
        opacity: 1
    })
} else {
    gsap.to('.btn-call', {
        scrollTrigger: {
            trigger: '.contact-us-main-group',
            scrub: true,
            start: '-40% center'
        },
        x: 350,
        opacity: 1
    })
}


// Split Bill
const btnCalculate = document.querySelector('#btn');
const btnAddTip = document.querySelector('#addTip');

btnAddTip.addEventListener('click', showTip);
function showTip(e) {
    e.preventDefault();
    tip.style.display = 'block';
}

btnCalculate.addEventListener('click', calculateAmount); 
function calculateAmount(e) {
    e.preventDefault();

    const bill = document.querySelector('#bill').value;
    const people = document.querySelector('#people').value;
    const tip = document.querySelector('#tip').value;

    if (bill === "" || people === "" || people < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please enter your information!'
        })
    }

    let billPerPerson = bill / people;
    let tipPerPerson = (bill * tip) / people;
    let totalAmount = billPerPerson + tipPerPerson;

    billPerPerson = billPerPerson.toFixed(2);
    tipPerPerson = tipPerPerson.toFixed(2);
    totalAmount = totalAmount.toFixed(2);

    document.querySelector('#billPerPerson').textContent = billPerPerson;
    document.querySelector('#tipPerPerson').textContent = tipPerPerson;
    document.querySelector('#billAndTip').textContent = totalAmount;
}




