const listItems = [
    "item 1",
    "item 2",
    "item 3",
    "item 4",
    "item 5",
    "item 6",
    "item 7",
    "item 8",
    "item 9",
    "item 10",
    "item 11",
    "item 12",
    "item 13",
    "item 14",
    "item 15",
    "item 16",
    "item 17",
    "item 18",
    "item 19",
    "item 20",
    "item 21",
    "item 22",
    "item 22",
    "item 23",
    "item 24",
    "item 25",
    "item 26",
    "item 27",
    "item 28",
    "item 29",
    "item 30",
    "item 31",
    "item 32",
]

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
        let index = 0;
        switch(page) {
            case 1:
                break;
            case 2:
                index = 1
                break;
            case 3:
                index = 2
                break;
            default:
                break;
        }

        let bLeftArrow = true
        displayButtons(items, wrapper, page, buttonCountHistory[index], bLeftArrow)
    }

   

}

displayButtons(intrestButtonsArray, intrestButtonsWrapper, currentPage, 0) 



function checkOverflow(element) {
    const bOverflow = element.clientWidth < element.scrollWidth
    return bOverflow
}
