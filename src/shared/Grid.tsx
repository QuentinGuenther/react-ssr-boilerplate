import * as React from 'react'
import { Component } from 'react'
import { isBrowser } from './globals'

interface IProps {
    data: any;
    match: {
      params: {
        id: string;
      }
    };
    fetchInitialData: (lang: string) => Promise<any>
}

interface IState {
  repos: any[];
  loading: boolean,
}

class Grid extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    let repos
    if (isBrowser) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.data
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentDidMount () {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  componentDidUpdate (prevProps: IProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  fetchRepos (lang: string) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(lang)
      .then((repos: any[]) => this.setState(() => ({
        repos,
        loading: false,
      })))
  }
  render() {
    const { loading, repos } = this.state

    if (loading === true) {
      return <p>LOADING</p>
    }

    return (
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}

export default Grid