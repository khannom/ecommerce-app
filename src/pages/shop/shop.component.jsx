import React from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// importamos props porque vamos a usar history, match, etc
class ShopPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state;
        return (
            <div className='shop-page'>
                {collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview  key={id} {...otherCollectionProps} />
                ))}
            </div>
        )
    }
};

export default ShopPage;