import { Router, query } from 'express'
import axios from 'axios'
 
const router = Router()
 
router.get('/', (req, res) => {
  let businesses = []
  let offsetCount = 0
  const businessLimit = 1000
  const queryLimit = '50'
  let totalBusinesses = 0
  let dailyLimit = 0
  let remainingLimit = 0
  const timeStart = new Date()
  const queryParams = req.query
  const searchLocation = queryParams.searchLocation ? queryParams.searchLocation : 'V3M0C3'
  const radius = queryParams.radius ? queryParams.radius : '5'

  const delay = interval => new Promise(resolve => setTimeout(resolve, interval))

  const fetchData = async (i) => {
    const offsetParam = i > 0 ? (i * parseInt(queryLimit)).toString() : ''
    const url = `https://api.yelp.com/v3/businesses/search`

    await axios
      .get(url,
        {
          headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`
          },
          params: {
            categories: 'restaurants',
            location: searchLocation,
            radius: radius * 1000,
            limit: queryLimit,
            offset: offsetParam,
          }
        }
      )
      .then(async (yelpRes) => {
        if (yelpRes.status === 200) {
          dailyLimit = parseInt(yelpRes.headers['ratelimit-dailylimit'])
          remainingLimit = parseInt(yelpRes.headers['ratelimit-remaining'])
          totalBusinesses = parseInt(yelpRes.data.total)
          offsetCount += parseInt(queryLimit)

          businesses = [...businesses, ...yelpRes.data.businesses]
          // console.log(`i = ${i} business count = ${businesses.length}`)
        }

        if (i === 0) {
          if (offsetCount < totalBusinesses) {
            const remainingQueryCount = totalBusinesses >= 1000 ? 19 : Math.floor(totalBusinesses/queryLimit)

            if (remainingQueryCount > 0) {
              for (let ii=1; ii<=remainingQueryCount; ii++) {
                // console.log(`i = ${i} ii = ${ii}`)
                if (ii > 4) {
                  await delay(500)
                }
                
                fetchData(ii)
              }          
            }
          }
        }

        if (offsetCount >= totalBusinesses || offsetCount >= businessLimit) {
          const sortFunction = (businessA, businessB) => {         
            if ( businessA.rating < businessB.rating ){
              return -1
            }
            if ( businessA.rating > businessB.rating ){
              return 1
            }
            if ( businessA.rating === businessB.rating ) {
              const aReviewCount = businessA.review_count || 0
              const bReviewCount = businessB.review_count || 0
              if (aReviewCount > bReviewCount) {
                return 1
              }
              if (bReviewCount > aReviewCount) {
                return -1
              }
              if (aReviewCount === bReviewCount) {
                const aName = businessA.name.toUpperCase()
                const bName = businessB.name.toUpperCase()
                if ( aName > bName ) {
                  return 1
                }
                if ( bName > aName ) {
                  return -1
                }                
              }
            }
            return 0; 
          }
          const sortedBusinesses = businesses
            .sort(sortFunction)
            // .filter()

          const timeEnd = new Date()
          const elapsedTime = (timeEnd - timeStart)/1000
          const searchStats = {
            total: totalBusinesses,
            dailyLimit: dailyLimit,
            remainingLimit: remainingLimit,
            elapsedTime: elapsedTime,            
          }
          return res.send({
            businesses: sortedBusinesses.length > 10 ? sortedBusinesses.slice(0,10) : sortedBusinesses,
            searchStats: searchStats,
          })
        }
      })
      .catch((error) => console.log(error.response));
  }

  fetchData(0)
})

router.get('/:businessId', (req, res) => {
  return res.send(req.context.models.businesses[req.params.businessId])
})
 
export default router