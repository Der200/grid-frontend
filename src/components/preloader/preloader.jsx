import preloader from '../../images/preloader.gif'


const Preloader = () => {

  return (
    <div style={{margin: "40px auto", width: "230px"}}>
      <img src={preloader} alt="анимация загрузки" />
      <span style={{verticalAlign: "top", lineHeight: 2, marginLeft: "10px"}}>Данные загружаются</span>
    </div>
  )
}

export default Preloader;