import React, { Component, Fragment } from 'react'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  star: {
    normal: { color: 'gray', },
    selected: { color: '#f39c12', },
  },
  iconBtn: {
    fontSize: '.9em',
    padding: '5px 5px',
  },
}

const StarIcon = ({ isSelected, onClick }) => (
  <IconButton color="inherit" style={styles.iconBtn} onClick={onClick}>
    <i
      className="fas fa-star"
      style={
        isSelected
          ? styles.star.selected
          : styles.star.normal
      }
    />
    </IconButton>
)

class Rating extends Component {
  changeValue = (value) => {
    return () => {
      this.props.onChange(value + 1)
    }
  }
  render = () => (
    <div style={styles.stars}>
      {Array(5).fill(null).map((_, value) => (
        value < this.props.value ? (
          <StarIcon
            key={`star-${value}`}
            onClick={this.changeValue(value)}
            isSelected
          />
        ) : (
          <StarIcon
            key={`star-${value}`}
            onClick={this.changeValue(value)}
          />
        )
      ))}
    </div>
  )
}

export default Rating