const domElements = {
    rating: {
        total: document.getElementById('rating-total'),
        countVotes: document.getElementById('rating-votes-total'),
        stroke: document.getElementById('rating-stroke'),
       
      votes: [
        {
            count: document.getElementById('rating-1-votes'),
            progress: document.getElementById('rating-1-progress'),
        },
        {
            count: document.getElementById('rating-2-votes'),
            progress: document.getElementById('rating-2-progress'),
        },
         {
            count: document.getElementById('rating-3-votes'),
            progress: document.getElementById('rating-3-progress'),
        },
         {
            count: document.getElementById('rating-4-votes'),
            progress: document.getElementById('rating-4-progress'),
        },
         {
            count: document.getElementById('rating-5-votes'),
            progress: document.getElementById('rating-5-progress'),
        },
      ]
    },
    form: {
        inputs: document.getElementById('form-inputs'),
        button: document.getElementById('send-vote'),
    }
}

     // Добавление голоса

{
     const votes = [0,0,0,0,0];

        // функция обработчик отслеживание клика по кнопке и голосов
                
     domElements.form.button.onclick = () => {
     const input = domElements.form.inputs.querySelector('input:checked')
     let totalVotesCount = 0;
     addVote(input.value)
     totalVotesCount = calculateTotalVotesCount(votes)
     renderVoteCount(totalVotesCount)
     renderTotalVotesCount(totalVotesCount)
     renderTotalRating()
  
     }      
        //  функция добавления голоса в оценку  
           
        function addVote(ratingNum) {
          const index = ratingNum - 1
          votes[index] = votes[index] + 1
    }

         // функция вывода количества голосов по оценке

        function renderVoteCount(totalVotesCount) {
         domElements.rating.votes.forEach((vote, index) => {
         const votePercent = calculateVotePercent(votes, totalVotesCount, index)
         vote.count.innerHTML = votes[index]
         vote.progress.style.width = `${votePercent}%`
    }
 )}

        // функция просчёта общего количества голосов
        function calculateTotalVotesCount(votes) { 
          const totalVotesCount = votes.reduce(((sum, current) => {
           return sum + current
    }))

           return totalVotesCount
   }
        //функция вывода общего количества голосов
        function renderTotalVotesCount(totalVotesCount) {
          domElements.rating.countVotes.innerHTML = totalVotesCount
    }
        // Функция просчёта общего рейтинга
        function calculateTotalRating(votes) {
          const defaultRating = {
            sum: 0,
            votes: 0
          }
          const rating = votes.reduce((rating, current, index) => {
          const voteTotal = (index + 1) * current
          const newRating = {
            sum: rating.sum + voteTotal,
            votes: rating.votes + current
            }
            return  newRating 
          }, defaultRating)
          const ratingTotal = rating.sum / rating.votes
          
            return ratingTotal.toFixed(1)
        }
        
        // Функция просчёта заполнения обводки общего рейтинга
        function calculateTotalRatingStroke(totalRating) {
          const strokeOneNumber = 60 / 100
          const ratingOnePercent = 5 / 100
          const totalRatingPercent = totalRating /  ratingOnePercent 
          const strokeFillNumber = totalRatingPercent * strokeOneNumber

            return strokeFillNumber
        }

        // Функция вывода общего рейтинга
        function renderTotalRating() {
          const totalRating = calculateTotalRating (votes)
          const strokeFillNumber = calculateTotalRatingStroke(totalRating)
          domElements.rating.total.innerHTML = totalRating
          domElements.rating.stroke.style.strokeDasharray = `${strokeFillNumber} 60`
        }

        // Функция просчёта % голосов из общего количества голосов
        function calculateVotePercent(votes, totalVotesCount, voteIndex) {
           const percent = totalVotesCount / 100
           const calculatedPercent = votes[voteIndex] / percent
             return calculatedPercent
        }
   }
