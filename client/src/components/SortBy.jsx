import React, {Component} from 'react'
import AdminTable from './AdminTable'

export default class SortBy extends Component {
    constructor(props){
        super(props)
        this.state={
            data: data
        }
        this.state = this.sortBy.bind(this)
    }
    sortBy(key){
        this.setState({
            data: data.sort((a,b)=> a[key] < b[key])
        })
    }
    render(){
        return(
            <AdminTable 
            data = {data}
            sortBy = {this.sortBy}
            />
        )
    }
}