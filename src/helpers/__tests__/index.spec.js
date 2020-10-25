import { queryFromUriPath } from 'helpers'

describe('Helpers', () => {
  it('matches search query', () => {
    expect(queryFromUriPath('/omdb-film-browser-web/search/jacko')).toEqual('jacko')
  })
})
