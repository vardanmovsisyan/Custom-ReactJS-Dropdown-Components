import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import './style/global.styl'

class DropdownMultiple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      timeOut: null
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate() {
    const { listOpen } = this.state
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close)
      }
      else {
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  }

  close(timeOut) {
    this.setState({
      listOpen: false
    })
  }

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter(function (a) { return a.selected; }).length;
    if (count === 0) {
      return { headerTitle: nextProps.title }
    }
    else {

      return { headerTitle: `${nextProps.title} (${count})` }
    }
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const { list, toggleItem, index } = this.props
    const { listOpen, headerTitle } = this.state
    return (
      <div className="dd-wrapper">
        <button className={`dd-header ${listOpen ? 'open' : ''} `} onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.6 6.8"><defs></defs><path d="M4.52,13.65a1.06,1.06,0,0,0,1.57,0L10,9.91l3.91,3.74a1.06,1.06,0,0,0,1.57,0,1.18,1.18,0,0,0,0-1.61c-.4-.42-4.69-4.5-4.69-4.5A1.08,1.08,0,0,0,10,7.2a1.09,1.09,0,0,0-.79.34S4.92,11.62,4.52,12A1.18,1.18,0,0,0,4.52,13.65Z" transform="translate(-4.2 -7.2)" fill='#fff' /></svg>
            : <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.6 6.8"><defs></defs><path d="M4.52,7.55a1.06,1.06,0,0,1,1.57,0L10,11.3l3.91-3.75a1.06,1.06,0,0,1,1.57,0,1.18,1.18,0,0,1,0,1.61c-.4.42-4.69,4.5-4.69,4.5A1.08,1.08,0,0,1,10,14a1.09,1.09,0,0,1-.79-.34S4.92,9.58,4.52,9.16A1.18,1.18,0,0,1,4.52,7.55Z" transform="translate(-4.2 -7.2)" fill='#fff' /></svg>
          }
        </button>
        {listOpen && <div className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item, item_index) => (
            <button className="dd-list-item" key={item.title} onClick={() => toggleItem(item.id, index, item_index)}>
              <span className={`checkbox ${!!item.selected ? 'checked' : ''}`}></span>{item.title}
            </button>
          ))}
        </div>}
      </div>
    )
  }

}

export default DropdownMultiple
