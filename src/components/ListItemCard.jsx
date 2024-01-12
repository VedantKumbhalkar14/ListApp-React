import React from 'react'

const ListItemCard = ({id,name,description,style,className,moveListItem,createMode,isNewList,moveItemBackToList,showArrow}) => {
  return (
    <div className={`card ${className}`} style={{width: "13rem",...style}}>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    {createMode && !isNewList && <div className='d-flex justify-content-end'> 
    { (showArrow==="right") && <span onClick={()=>moveListItem(id)} style={{fontSize:"20px",cursor:"pointer"}}>&rarr;</span>}
        </div>}
    {createMode && !isNewList && <div className='d-flex justify-content-start'> 
    { (showArrow==="left") && <div onClick={()=>moveListItem(id)} style={{fontSize:"20px",cursor:"pointer"}} className='align-self-end'>&larr;</div>}
    </div>}

    {createMode && !isNewList && <div className='d-flex justify-content-between'> 
    { (showArrow==="both") && <span onClick={()=>moveListItem(id)} style={{fontSize:"20px",cursor:"pointer"}}>&larr;</span>}
    { (showArrow==="both") && <span onClick={()=>moveListItem(id)} style={{fontSize:"20px",cursor:"pointer"}}>&rarr;</span>}
    </div>}

    {createMode && isNewList && <div className='d-flex justify-content-between'> 
    <span onClick={()=>moveItemBackToList(id,"left")} style={{fontSize:"20px",cursor:"pointer"}}>&larr;</span>
    <span onClick={()=>moveItemBackToList(id,"right")} style={{fontSize:"20px",cursor:"pointer"}}>&rarr;</span>
    </div>}
  </div>
</div>
  )
}

export default ListItemCard
