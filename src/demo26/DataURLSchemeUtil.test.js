import {
  getInlineImageMatches,
  extractInlineImageMimeType,
  extractInlineImageBase64,
  isDataURL, generateCID
} from './DataURLSchemeUtil';

const text = '<html><body><div>测试</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABE4AAAJsCAYAAADjiOaLAAAgAElEQVR4Xoy9BXil1dX+fcfd3ZOZZNyFMUYZGChWtNAChUKpQIHS0lJqlEKFCm0pVqSlLVDcdYYZxt0zPplk4u5yIif5rt96stPAn/d9v3NduXLkkb3XXnvJveQJuPJLFw/1+LrU0tKioSG/EhMTFBwSqJ6eHvn9/QoICLD3Q0MB4tXW2qnu7m6lp2eqqGisMjLS1drWrIaGBnV0dMjv99txAwMD6u/vt89DQ0P2515BQUEKDAy0P2nQjuMVFhZm3/X29o58x/kcHxwcbP+9c6TBwUENasj+DwV6Y2Os/Ln37riRG3/OG5/Pp+TkZNXW1io0NNTu3dbWpjFjxtg8eeXk5OjUqVPKysrSuHHjFBUVpdTUVB0/flxdXR1KT09XV1eXampqdNFFF9k83n//fa1YscJ+g7Y/+MEP1NDQqoKCbJsH9wgLi1DgYDAjt/lBo0FJsbGxCo+MEGPr7OlWbHycQkJC1NLaat8xxyuvvkrjxhXph3fdpeTkRPX29" alt="image-data"/><div>学习</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABE4AAAJsCAYAAADjiOaLAAAgAElEQVR4Xoy9BXil1dX+fcfd3ZOZZNyFMUYZGChWtNAChUKpQIHS0lJqlEKFCm0pVqSlLVDcdYYZxt0zPplk4u5yIif5rt96stPAn/d9v3NduXLkkb3XXnvJveQJuPJLFw/1+LrU0tKioSG/EhMTFBwSqJ6eHvn9/QoICLD3Q0MB4tXW2qnu7m6lp2eqqGisMjLS1drWrIaGBnV0dMjv99txAwMD6u/vt89DQ0P2515BQUEKDAy0P2nQjuMVFhZm3/X29o58x/kcHxwcbP+9c6TBwUENasj+DwV6Y2Os/Ln37riRG3/OG5/Pp+TkZNXW1iY/+" alt="image-data"/></body></html>';

const matches = getInlineImageMatches(text);
matches.forEach(match => {
  console.log(match);
  const data = match[2];
  if (isDataURL(data)) {
    console.log(extractInlineImageMimeType(data));
    const base64Data = extractInlineImageBase64(data);
    console.log(generateCID(data))
    console.log(base64Data);

  } else {
    console.log('not inline image')
  }
});
