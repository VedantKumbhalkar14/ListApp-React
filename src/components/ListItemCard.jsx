import React from 'react'

const ListItemCard = ({id,name,description,style,className,moveListItem,createMode,isNewList,moveItemBackToList}) => {
  return (
    <div className={`card ${className}`} style={{width: "13rem",...style}}>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    {createMode && !isNewList && <div className='d-flex justify-content-between'> 
    <span onClick={()=>moveListItem(id)} style={{fontSize:"20px",cursor:"pointer"}}>&larr;</span>
    <span onClick={()=>moveListItem(id)} style={{fontSize:"20px",cursor:"pointer"}}>&rarr;</span>
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
