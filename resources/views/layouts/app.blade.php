<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
        window.REQUEST_CONFIG = {!! json_encode(config('survey_request')) !!};
    </script>

    <title>Survey</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ mix('css/main.css') }}" rel="stylesheet">

</head>
<body>
    <div class="container">
        @yield('content')
        <div id="survey-creation" class="row well well-lg"></div>

      <footer class="footer">
        @include ('footer')
      </footer>

    </div>
    <script type="text/javascript" src="{{ mix('js/app.compiled.min.js') }}"></script>
</body>
</html>
