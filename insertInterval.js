/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

const intervals = [[1,3],[6,9]], newInterval = [2,5]

insert(intervals, newInterval)

 function insert (intervals, newInterval) {
    // first we insert the new interval into the exisiting interval at the correct location
    for ( let i = 0; i < intervals.length; i++) {
        if(newInterval[0]<=intervals[i][0]){
            // once we find the first element that is greater than our new element
            // we will splice in our new element into the place before, and exit the loop
            intervals.splice(i, 0, newInterval);
            break
        } else if (i === intervals.length - 1){
            // we need to check if we have reached the end without breaking, meaning the new element goes at the end
            intervals.push(newInterval)
        }
    }
    console.log(intervals)
    
    if(intervals.length === 0) intervals.push(newInterval)
    // start by iterating through the intervals array
    for ( let i = 0; i < intervals.length; i++){
        // check to make sure we dont run out of bounds
        if(intervals[i+1]){
            // we now check if the 0th element of the next element is less than or eq to the curr element's 1st element
            if(intervals[i+1][0] <= intervals[i][1] ){
                // if we see that we need to merge intervals, then we see which numbers are greater, and update the current element's ending interval
                intervals[i][1] = Math.max(intervals[i+1][1],intervals[i][1]);
                // then we delete that element that was just "merged" into the current element
                intervals.splice(i+1, 1);
                // and we decremenet i since we have just deleted an element
                i--
            }
        }
    }
    
  return intervals  
};