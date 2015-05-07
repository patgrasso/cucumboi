Given /^the input "(.*)"$/ do |arg|
    @input=arg #May need to change to curl call here and input as a name
end

When /^The Database is run and a score is added$/ do
    @output=`curl --request POST 'http://localhost:8000/highscores' --data "name=pat&score=10"` #MUST FIX must do db.cucumboi.findOne('name') can find by using regex: take char b/n "=" pat "&"
    #puts @output
end


Then /^the output should be "(.*)"$/ do |correct_output|
    	file = File.open(correct_output, "rb")
	contents = file.read
	file.close
	#puts contents
	raise ('wrong answer!!!!') unless (@output <=> contents) == 0 
end

#!!!!!
=begin

When /^the calculator is run$/ do
   @output = `ruby calc.rb #{@input}`
   raise('calculator failed') unless $?.success?
end
   
Then /^the output should be "(.*)"$/ do |correct_output|
   raise ('wrong answer!!!') unless @output == correct_output
end

=end
#!!!!!!