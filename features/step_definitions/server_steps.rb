Given /^the name "(.*)" and score "(.*)"$/ do |arg1, arg2|
    @name=arg1
    @score=arg2
end


# Storing Scores
When /^the server is running$/ do
    `curl --request POST 'http://localhost:8000/highscores' --data "name=#{@name}&score=#{@score}" --silent`
end

Then /^a call to \/getscore of "(.*)" should return "(.*)"$/ do |eman, expected|
    @output=`curl --request GET 'http://localhost:8000/getscore' --data "name=#{@name}" --silent`
    raise 'wrong value returned!' unless @output == expected
end



# Retrieving Scores
When /^the server is running and we send in the score$/ do
    @output=`curl --request POST 'http://localhost:8000/highscores' --data "name=#{@name}&score=#{@score}" --silent`
end

Then /^the return data should be "(.*)"$/ do |expected|
    raise 'did not receive the correct response!' unless @output == expected
end
