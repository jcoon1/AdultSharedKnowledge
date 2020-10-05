var ItemArray = [
{Animal: "a bird", AnimalIndex: 1, Format: "Generic", Fact: "birds feed their babies regurgitated food", Image: "../_shared/images/exemplars/bird.jpg"},
{Animal: "a chimp", AnimalIndex: 2, Format: "Generic", Fact: "chimps crack open kernels", Image: "../_shared/images/exemplars/chimp.jpg"},
{Animal: "a dog", AnimalIndex: 3, Format: "Generic", Fact: "dogs get sick after eating carbamates", Image: "../_shared/images/exemplars/dog.jpg"},
{Animal: "a hedgehog", AnimalIndex: 4, Format: "Generic", Fact: "hedgehogs eat hexapods", Image: "../_shared/images/exemplars/hedgehog.jpg"},
{Animal: "an opossum", AnimalIndex: 5, Format: "Generic", Fact: "opossums make their homes in foliage", Image: "../_shared/images/exemplars/opossum.jpg"},
{Animal: "a seal", AnimalIndex: 6, Format: "Generic", Fact: "seals sleep on their dorsal side", Image: "../_shared/images/exemplars/seal.jpg"},
{Animal: "a snake", AnimalIndex: 7, Format: "Generic", Fact: "snakes steal embryos from other animals", Image: "../_shared/images/exemplars/snake.jpg"},
{Animal: "a tiger", AnimalIndex: 8, Format: "Generic", Fact: "tigers catch lots of ruminants", Image: "../_shared/images/exemplars/tiger.jpg"},
{Animal: "a bird", AnimalIndex: 1, Format: "Specific", Fact: "last night, this bird fed its babies regurgitated food", Image: "../_shared/images/exemplars/bird.jpg"},
{Animal: "a chimp", AnimalIndex: 2, Format: "Specific", Fact: "last night, this chimp cracked open kernels", Image: "../_shared/images/exemplars/chimp.jpg"},
{Animal: "a dog", AnimalIndex: 3, Format: "Specific", Fact: "last night, this dog got sick after eating carbamates", Image: "../_shared/images/exemplars/dog.jpg"},
{Animal: "a hedgehog", AnimalIndex: 4, Format: "Specific", Fact: "last night, this hedgehog ate hexapods", Image: "../_shared/images/exemplars/hedgehog.jpg"},
{Animal: "an opossum", AnimalIndex: 5, Format: "Specific", Fact: "last night, this opossum made its home in foliage", Image: "../_shared/images/exemplars/opossum.jpg"},
{Animal: "a seal", AnimalIndex: 6, Format: "Specific", Fact: "last night, this seal slept on its dorsal side", Image: "../_shared/images/exemplars/seal.jpg"},
{Animal: "a snake", AnimalIndex: 7, Format: "Specific", Fact: "last night, this snake stole embryos from other animals", Image: "../_shared/images/exemplars/snake.jpg"},
{Animal: "a tiger", AnimalIndex: 8, Format: "Specific", Fact: "last night, this tiger caught lots of ruminants", Image: "../_shared/images/exemplars/tiger.jpg"}
]

function coinFlip() {
    return Math.floor(Math.random() * 2);
}

var Index = [1,2,3,4,5,6,7,8]

var ShuffleIndex = _.shuffle(Index)

BlockOrderFlip = coinFlip()

var FormatBlocks = []

if(BlockOrderFlip == 0){
	FormatBlocks = ["Generic", "Generic","Generic","Generic","Specific","Specific","Specific","Specific"]
}else{FormatBlocks = ["Specific","Specific","Specific","Specific","Generic", "Generic","Generic","Generic"]}

exp.FilterList = []

for (i=0;i<8;i++){
exp.FilterList[i] = _.filter(ItemArray,function(item){return item["AnimalIndex"] == ShuffleIndex[i] && item["Format"] == FormatBlocks[i]})
}

exp.PresentItems = []
for(i=0;i<8;i++){
exp.PresentItems[i] = exp.FilterList[i][0]}

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  // slides.single_trial = slide({
  //   name: "single_trial",
  //   start: function() {
  //     $(".err").hide();
  //     $(".display_condition").html("You are in " + exp.condition + ".");
  //   },
  //   button : function() {
  //     response = $("#text_response").val();
  //     if (response.length == 0) {
  //       $(".err").show();
  //     } else {
  //       exp.data_trials.push({
  //         "trial_type" : "single_trial",
  //         "response" : response
  //       });
  //       exp.go(); //make sure this is at the *end*, after you log your data
  //     }
  //   },
  // });

  slides.spread_slider = slide({
    name : "spread_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : exp.PresentItems,
    // present : [exp.PresentItems[0]],
    // present : _.sample(exp.PresentItems),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err_radio").hide();
      $(".err_slider").hide();
      // $(".showButton").show();

      this.stim = stim; //I like to store this information in the slide so I can record it later.


      $(".CapFact").html(stim.Fact.charAt(0).toUpperCase() + stim.Fact.substring(1)+".");
      $(".QuestFact").html(stim.Fact + "?")
      $(".Animal").html(stim.Animal)
      "<img src=" + stim.Image + "alt=\"Animal\" id=\"AnimalPic\"></img>"
      $("#AnimalExemplar").html("<img src =\"" + stim.Image + "\" alt=\"Animal\" id=\"AnimalPic\"></img>")
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value

      $('input[type=radio]').attr('checked', false); //for radio button response
      // hide stuff
      $(".err_radio").hide();
      $(".err_slider").hide();
      $(".hidden").hide();
      $(".radio").hide();

      this.trial_num++;
    },

    showButton : function() {
      if (exp.sliderPost == null) {
        $(".err_slider").show();
      } else {
        this.log_responses();
        $(".showButton").hide();
        $(".radio").show();
        $(".hidden").show();
        $(".err_slider").hide();                   
        }

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        // _stream.apply(this);
      //response = $("#testFreeResponse").val();
    },

      button : function(){
      if ($('input[type=radio]:checked').size() == 0) {
        $(".err_radio").show();
      } else {
                    var end_time = Date.now();
        this.time_spent = end_time - this.start_time;
        this.log_responses();
        $(".showButton").show();
        _stream.apply(this); //make sure this is at the *end*, after you log your data
      }
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        // "trial_type" : "spread_slider",
        "spread_response" : exp.sliderPost,
        "Animal" : this.stim.Animal,
        "Format" : this.stim.Format,
        "AnimalIndex" : this.stim.AnimalIndex,
        "Fact" : this.stim.Fact,
        // "trial_type" : "prior_knowledge",
        "prior_response" : $('input[type=radio]:checked').val(), //if using radio buttons
        // "Animal" : stim.Animal,
        // "Format" : this.stim.Format,
        // "TraitType" : this.stim.TraitType,
        // "Fact" : this.stim.Fact
      });
    }
  });

// slides.prior_knowledge = slide({
//     name : "prior_knowledge",

//      trial information for this block
//      (the variable 'stim' will change between each of these values,
//       and for each of these, present_handle will be run.) 
//     present : exp.PresentItems2,

    // trial_num: 0,

    //this gets run only at the beginning of the block
    // present_handle : function(stim) {

    //   $('input[type=radio]').attr('checked', false); //for radio button response
    //   // hide stuff
    //   $(".err").hide();

    //   this.stim = stim; //I like to store this information in the slide so I can record it later.


    //   // $(".CapFact").html(stim.Fact.charAt(0).toUpperCase() + stim.Fact.substring(1)+".");
    //   $(".QuestFact").html(stim.Fact + "?")
    //   $(".Animal").html(stim.Animal)
    //   "<img src=" + stim.Image + "alt=\"Animal\" id=\"AnimalPic\"></img>"
    //   $("#AnimalExemplar2").html("<img src =\"" + stim.Image + "\" alt=\"Animal\" id=\"AnimalPic\"></img>")
    //         this.start_time = Date.now()
    //   // this.init_sliders();
    //   // exp.sliderPost = null; //erase current slider value
    //   this.trial_num++;
    // },

    //     button : function() {
    //   var end_time = Date.now();
    //   //response = $("#testFreeResponse").val();
    //   if ($('input[type=radio]:checked').size() == 0) {
    //     $(".err").show();
    //   } else {
    //     this.time_spent = end_time - this.start_time;
    //     this.log_responses();
    //     _stream.apply(this); //make sure this is at the *end*, after you log your data
    //   }
    // },

  //   log_responses : function() {
  //     exp.data_trials.push({
  //       "trial_type" : "prior_knowledge",
  //       "response" : $('input[type=radio]:checked').val(), //if using radio buttons
  //       // "Animal" : stim.Animal,
  //       "Format" : this.stim.Format,
  //       "TraitType" : this.stim.TraitType,
  //       "Fact" : this.stim.Fact
  //     });
  //   }
  // });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        useremail : $("#useremail").val(),
        language : $("#language").val(),
        // enjoyment : $("#enjoyment").val(),
        // asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val()
        // problems: $("#problems").val(),
        // fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["CONDITION 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "spread_slider", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
