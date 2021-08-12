const intrestButtons = document.querySelectorAll('.instest-btn')

 const intrestButtonsArray = Object.values(intrestButtons)


const intrestButtonsWrapper = document.querySelector('.container')


const listElement = document.getElementById('list')
const paginationElement = document.getElementById('pagination')

let currentPage = 1
let counter = 0
let buttonCountHistory = [0];
let paginationArrowLeft = document.querySelector('.overflow-btn-left')
let paginationArroRight = document.querySelector('.overflow-btn-right')
paginationArrowLeft.dataset.listener = 'false'
paginationArroRight.dataset.listener = 'false'
let pageHistory = []

function displayButtons(items, wrapper, page, start, bLeftArrow = false) {
    // store history of pages for later
    console.log(page)
    if (bLeftArrow){
        
    } else {
        pageHistory.push(page)
    }
    // Empty the wrapper
    wrapper.innerHTML = ""

    // Add Left arrow when not page 1
    if (page > 1) {
        wrapper.appendChild(paginationArrowLeft)
        // Add EL to left arrow
        // Add it if it dont have laready
        if (paginationArrowLeft.dataset.listener === 'false') {
            // Make sure not to stack Event Listeners
            paginationArrowLeft.addEventListener('click', handleELClick)
            paginationArrowLeft.dataset.listener = 'true'
        } 
    } 

    let arrayEnd = items.length
    let paginatedItems = items.slice(start, arrayEnd)

    // Make sure counter starts at the right number
    let index = buttonCountHistory.length - 1
    counter = buttonCountHistory[index]
    console.log(counter)

    paginatedItems.some(element => {
        // Keep track how many buttons we added for later
        if (!bLeftArrow)
            counter++
        // Exit the loop when buttons overflowing
        wrapper.appendChild(element)
        return checkOverflow(wrapper)
    })

    if(bLeftArrow) {
        // Do nothing
    } else {
        buttonCountHistory.push(counter)
    }

    console.log(buttonCountHistory)

    if (checkOverflow(wrapper)) {
        wrapper.appendChild(paginationArroRight)
        // Add EL to paginaitonArrow
        if (paginationArroRight.dataset.listener === 'false') {
            // Make sure not to stack Event Listeners
            paginationArroRight.addEventListener('click', handleRightELClick)
            paginationArroRight.dataset.listener = 'true'
        } 
    } 

    function handleRightELClick(e) {
        
        
        // Updating the page 
        page = pageHistory.length + 1
        let index = (buttonCountHistory.length - 1)
        displayButtons(items, wrapper, page, buttonCountHistory[index])
    }

    function handleELClick(e) {
        // Updating the page 
        page = pageHistory.length - 1
        pageHistory.pop()
        // Make sure the counter starts at the right place (MAKE SURE TO KEEP STARTING CONDITION THE SAME COUNTER NEVER 0)
        buttonCountHistory.pop()
        let index = page - 1

        let bLeftArrow = true
        displayButtons(items, wrapper, page, buttonCountHistory[index], bLeftArrow)
    }

   

}

displayButtons(intrestButtonsArray, intrestButtonsWrapper, currentPage, 0) 



function checkOverflow(element) {
    const bOverflow = element.clientWidth < element.scrollWidth
    return bOverflow
}
