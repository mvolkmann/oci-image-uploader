import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './grid.scss';

class ImageInput extends Component {
  state = {
    imageUrl: '',
    error: '',
    images: []
  };

  static get defaultProps() {
    return {
      getAllUrl: '',
      saveUrl: '',
      handleSelect: null
    };
  }

  static propTypes = {
    getAllUrl: PropTypes.string,
    handleSelect: PropTypes.func,
    saveUrl: PropTypes.string
  };

  isValidImage = imageUrl => {
    const image = new Image();
    image.onload = () => {
      const {saveUrl} = this.props;
      if (saveUrl) {
        axios.post(saveUrl, {
          url: imageUrl
        });
      }
      const img = {src: imageUrl, alt: 'image'};
      this.setState(prevState => ({images: [...prevState.images, img]}));
    };
    image.onerror = () => {
      this.setState({error: 'Url does not refer to an image.'});
    };
    image.src = imageUrl;
  };

  handleChange = evt => {
    this.setState({imageUrl: evt.target.value});
  };

  handleSubmit = evt => {
    evt.preventDefault();
    try {
      this.isValidImage(this.state.imageUrl);
      this.setState({imageUrl: ''});
    } catch (error) {
      this.setState({error});
    }
  };

  async componentDidMount() {
    const {getAllUrl} = this.props;
    if (getAllUrl) {
      const imageUrls = await axios.get(getAllUrl);
      this.setState(prevState => ({images: [...prevState.images, imageUrls]}));
    }
  }

  render() {
    const {handleSelect} = this.props;
    const onClick = img => handleSelect && handleSelect(img);
    return (
      <div>
        <div>
          {this.state.images.map(img => (
            <img
              key={img.src}
              className="imageIcon"
              src={img.src}
              alt={img.alt}
              onClick={() => onClick(img)}
            />
          ))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <p className="url">
            <label htmlFor="url" className="urlLabel">
              Image Url
              <input
                type="text"
                name="url"
                className="urlInput"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p className="submit">
            <input type="submit" value="Submit" className="submitButton" />
          </p>
        </form>
        {this.state.error && (
          <span className="errorMessage">{this.state.error}</span>
        )}
      </div>
    );
  }
}

export default ImageInput;
