
const calc = (price = 100) => {
    const calcInputs = document.querySelectorAll('input.calc-item'),
        calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0;
        let countValue = 1,
            dayValue = 1;

        const typeValue = calcType.value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }
        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        }
        return total;
    }

    const animateTotal = () => {
        let timeoutId;
        let target = countSum()
        const currentValue = +totalValue.textContent;
        const speed = 200;

        const inc = target / speed;

        if (currentValue < target) {
            totalValue.textContent = Math.floor(currentValue + inc);
            timeoutId = setTimeout(animateTotal, 5);
        } else {
            totalValue.textContent = target;
            clearTimeout(timeoutId);
        }
    }

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        if (target.matches('select') || target.matches('input')) {
            animateTotal();
        }
        if (target.matches('select.calc-type')) {
            if (calcType.value === '') {
                calcInputs.forEach(el => {
                    el.value = '';
                })
            }
        }
    });

    calcType.addEventListener('change', () => {
        total = 0;
    });
}

export default calc;