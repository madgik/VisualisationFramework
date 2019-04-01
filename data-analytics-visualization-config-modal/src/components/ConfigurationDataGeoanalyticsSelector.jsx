import React from 'react'

import {  Header, Dropdown, Divider, List, Icon } from 'semantic-ui-react'

class ConfigurationDataGeoanalyticsSelector extends React.Component {
    Messages = {
        Geoanalytics: 'Or select a geoanalytics layer'
    }

    

    handleProjectChange() {

    }

    handleLayerChange() {
        
    }

    render() {
        return (
            <div>
                <Divider/>
                <Header>
                    Select Layers from Geoanalytics
                </Header>
                <Dropdown
                placeholder='Layer'
                selection
                options={this.props.layers}
                value={this.props.layers[0]}
                onChange={(e, { value }) => this.handleLayerChange('layer', value)} />
            </div>);
    }

}

export default ConfigurationDataGeoanalyticsSelector;