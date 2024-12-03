var Webflow = Webflow || []
Webflow.push(function () {
  
  const identifier = sessionStorage['fc-dropdown-toggle']
  
  if(identifier !== undefined)
  {  
  	const toggles = document.querySelectorAll('[fc-dropdown-toggle]')
    let toggleIdentifiers = []
    for(const toggle of toggles)
      toggleIdentifiers.push(toggle.getAttribute('fc-dropdown-toggle'))
  
    for(let i = 0; i < toggleIdentifiers.length; i++)
    {
    	if(identifier === toggleIdentifiers[i])
      {
        const toggleToTrigger = toggles[i]
        toggleToTrigger.dispatchEvent(new Event('mousedown'))
        toggleToTrigger.dispatchEvent(new Event('mouseup'))

        $(toggleToTrigger).trigger('tap')
      }
    }
  }
  else
  {
  	const dropdowns = document.querySelectorAll('[fc-dropdown = default]')
    
    if(dropdowns.length === 1)
    {  
      const dropdown = dropdowns[0]
      const dropdownToggle = dropdown.querySelector('.w-dropdown-toggle')

      dropdownToggle.dispatchEvent(new Event('mousedown'))
      dropdownToggle.dispatchEvent(new Event('mouseup'))

      $(dropdownToggle).trigger('tap')
    }
    else if(dropdowns.length > 1)
    {
    	let options = {
      	threshold: 0,
   		}
      
      let callback = (entries, observer) => {
        entries.forEach((entry) => {
        
          if(entry.isIntersecting)
          {
            const dropdownToggle = entry.target.querySelector('.w-dropdown-toggle')
            
            if(!dropdownToggle.classList.contains('w--open'))
            {
              dropdownToggle.dispatchEvent(new Event('mousedown'))
              dropdownToggle.dispatchEvent(new Event('mouseup'))

              $(dropdownToggle).trigger('tap')
            }
          }
        })
      }

			let observer = new IntersectionObserver(callback, options)
    
    	for(const dropdown of dropdowns)
				observer.observe(dropdown)
    }
  }
})
