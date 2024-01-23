const accordionsBenefits = document.querySelectorAll('.accordions-benefits .accordion');
const accordionsFaq = document.querySelectorAll('.accordions-faq .accordion');
		
const handleAccordions = (accordions) =>{
    accordions.forEach(accordion => {
        accordion.addEventListener('click',(event)=>{
            const contentTarget = event.currentTarget.children[1];
            const contentHeight = contentTarget.scrollHeight;
            
            if(contentTarget.dataset.active === "false" ){
                
                contentTarget.style.height = contentHeight + "px";
                contentTarget.style.opacity = 1;
                contentTarget.dataset.active = "true";
                
            }else if(contentTarget.dataset.active === "true"){
                
                contentTarget.style.height = "0px";
                contentTarget.style.opacity = 0;
                contentTarget.dataset.active = "false";
                
            }
            
        })});
}
		
handleAccordions(accordionsBenefits);
handleAccordions(accordionsFaq);