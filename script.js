const shape = document.getElementById('shape');

let isAnimating = false;
let isExpanded = false;

shape.addEventListener('click', () => {
    if (isAnimating) {
        return;
    }

    if (!isExpanded) {
        isAnimating = true;
        shape.style.height = '100px';
        shape.style.borderRadius = '0';
        setTimeout(() => {
            isAnimating = false;
            isExpanded = true;
        }, 10000);
    } else {
        isAnimating = true;
        shape.style.height = '10px';
        shape.style.borderRadius = '50%';
        setTimeout(() => {
            isAnimating = false;
            isExpanded = false;
        }, 10000);
    }
});